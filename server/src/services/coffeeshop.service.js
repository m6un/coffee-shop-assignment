import CoffeeShop from '../models/CoffeeShop.js';
import CoffeeProduct from '../models/CoffeeProduct.js';

export const getCoffeeShops = async (
  latitude,
  longitude,
  isFeatured,
  search,
  page = 0,
  limit = 12,
) => {
  try {
    //setup geospatial query
    const geoNearStage = {
      $geoNear: {
        near: { type: 'Point', coordinates: [Number(longitude), Number(latitude)] },
        distanceField: 'distance',
        spherical: true,
      },
    };

    const pipeline = [
      geoNearStage,

      // Handle search functionality
      ...(search
        ? [
            {
              $lookup: {
                from: 'coffeeproducts',
                let: { productIds: '$products' },
                pipeline: [
                  {
                    $match: {
                      $expr: { $in: ['$_id', '$$productIds'] },
                      name: { $regex: search, $options: 'i' },
                    },
                  },
                ],
                as: 'matchedProducts',
              },
            },
            {
              $match: {
                $or: [
                  { name: { $regex: search, $options: 'i' } },
                  { matchedProducts: { $ne: [] } },
                ],
              },
            },
            {
              $addFields: {
                products: {
                  $cond: {
                    if: { $eq: [{ $size: '$matchedProducts' }, 0] },
                    then: '$products',
                    else: '$matchedProducts',
                  },
                },
              },
            },
            {
              $project: { matchedProducts: 0 },
            },
          ]
        : []),

      // Filter featured shops if requested
      ...(isFeatured ? [{ $match: { isFeatured: true } }] : []),

      // Pagination
      { $skip: page * limit },
      { $limit: limit },

      // Select fields to return
      {
        $project: {
          name: 1,
          rating: 1,
          distance: 1,
          products: 1,
          images: 1,
          isFeatured: 1,
          amenities: 1,
        },
      },
    ];

    const coffeeShops = await CoffeeShop.aggregate(pipeline);

    // Get total count for pagination
    const totalCountPipeline = [
      geoNearStage,
      ...(search
        ? [
            {
              $lookup: {
                from: 'coffeeproducts',
                let: { productIds: '$products' },
                pipeline: [
                  {
                    $match: {
                      $expr: { $in: ['$_id', '$$productIds'] },
                      name: { $regex: search, $options: 'i' },
                    },
                  },
                ],
                as: 'matchedProducts',
              },
            },
            {
              $match: {
                $or: [
                  { name: { $regex: search, $options: 'i' } },
                  { matchedProducts: { $ne: [] } },
                ],
              },
            },
          ]
        : []),
      { $count: 'total' },
    ];

    const totalCountResult = await CoffeeShop.aggregate(totalCountPipeline);
    const totalCount = totalCountResult.length > 0 ? totalCountResult[0].total : 0;

    return {
      status: 200,
      data: {
        coffeeShops,
        totalCount,
        hasMore: (page + 1) * limit < totalCount,
        nextCursor: (page + 1) * limit < totalCount ? page + 1 : null,
      },
    };
  } catch (error) {
    return { status: 500, data: error };
  }
};

// Fetch details of a single coffee shop
export const getIndividualCoffeeShop = async (id) => {
  try {
    const coffeeShop = await CoffeeShop.findById(id).populate('products');
    return { status: 200, data: coffeeShop };
  } catch (error) {
    return { status: 500, data: error };
  }
};
