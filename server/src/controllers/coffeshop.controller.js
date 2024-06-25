import * as coffeeShopService from '../services/coffeeshop.service.js';

// Controller to get coffee shops based on query parameters
export const getCoffeeShopsController = async (req, res) => {
  const { latitude, longitude, isFeatured, page, search } = req.query;
  const response = await coffeeShopService.getCoffeeShops(
    latitude,
    longitude,
    isFeatured,
    search,
    page,
  );
  return res.status(response.status).json(response.data);
};

// Controller to get details of a specific coffee shop by ID
export const getCoffeeShopDetailsController = async (req, res) => {
  const { id } = req.params;
  const response = await coffeeShopService.getIndividualCoffeeShop(id);
  return res.status(response.status).json(response.data);
};
