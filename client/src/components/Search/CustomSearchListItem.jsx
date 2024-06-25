import { ListItem, Stack, Typography, Skeleton } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomShopListItem = ({ shop }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const distanceInKm = shop.distance / 1000;

  const navigate = useNavigate();
  return (
    <ListItem
      key={shop.id}
      onClick={() => navigate(`/shop/${shop._id}`)}
      sx={{
        padding: 1,
        cursor: 'pointer',
        width: 'calc(100% - 16px)',
        m: 1,
        borderRadius: '6px',
        '&:hover': { backgroundColor: 'grey.lighter2' },
      }}
    >
      <Stack>
        <Stack direction={'row'} gap={2}>
          {!imageLoaded && <Skeleton variant="rectangular" width={70} height={40} />}
          <img
            width={70}
            height={50}
            style={{
              borderRadius: '4px',
              objectFit: 'cover',
              display: imageLoaded ? 'block' : 'none',
            }}
            src={shop.images[0]}
            alt={shop.name}
            onLoad={() => setImageLoaded(true)}
          />
          <Stack gap={'0px'}>
            <Typography variant="body" fontWeight={600}>
              {shop.name}
            </Typography>
            <Typography fontSize={'12px'} color="grey.light">
              {distanceInKm.toFixed(2)} km
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </ListItem>
  );
};

// Shows a product with its image and shop name
const CustomProductListItem = ({ shop, product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  return (
    <ListItem
      onClick={() => navigate(`/shop/${shop._id}?tab=${product.category}`)}
      key={product._id}
      sx={{
        padding: 1,
        cursor: 'pointer',
        width: 'calc(100% - 16px)',
        m: 1,
        borderRadius: '6px',
        '&:hover': { backgroundColor: 'grey.lighter2' },
      }}
    >
      <Stack>
        <Stack direction={'row'} gap={2}>
          {!imageLoaded && <Skeleton variant="rectangular" width={70} height={40} />}
          <img
            width={70}
            height={50}
            style={{
              borderRadius: '4px',
              objectFit: 'cover',
              display: imageLoaded ? 'block' : 'none',
            }}
            src={product.image}
            alt={product.name}
            onLoad={() => setImageLoaded(true)}
          />
          <Stack gap={'0px'}>
            <Typography variant="body" fontWeight={600}>
              {product.name}
            </Typography>
            <Typography fontSize={'12px'} color="grey.light">
              {shop.name}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </ListItem>
  );
};

// Decides whether to show products or just the shop
export const CustomSearchListItem = ({ shop }) => {
  if (shop.products && shop.products.length > 0 && typeof shop.products[0] === 'object') {
    return shop.products.map((product) => (
      <CustomProductListItem key={product._id} shop={shop} product={product} />
    ));
  } else {
    return <CustomShopListItem shop={shop} />;
  }
};
