import { Box, Divider, Skeleton, Stack, Typography } from '@mui/material';
import { useState } from 'react';

const ProductListItem = ({ product, ref }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Box ref={ref}>
      <Stack direction={'column'} gap={2}>
        <Stack direction={'row'} gap={2}>
          <Box
            position="relative"
            sx={{ paddingRight: { xs: '10%', sm: 0 }, width: '100px', overflow: 'hidden' }}
          >
            {!imageLoaded && (
              <Skeleton
                variant="rectangular"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '8px',
                }}
              />
            )}
            <img
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '8px',
                objectFit: 'cover',
                opacity: 0,
                transition: 'opacity 0.3s ease-in-out',
              }}
              src={product.image}
              alt={product.name}
              onLoad={(e) => {
                e.target.style.opacity = 1;
                setImageLoaded(true);
              }}
            />
          </Box>
          <Stack direction={'column'} gap={0.25}>
            <Typography variant="h7" fontWeight={'600'}>
              {product.name}
            </Typography>
            <Typography variant="body" fontWeight={'400'} color={'grey.main'}>
              {product.description}
            </Typography>
            <Typography
              color={'primary.main'}
              sx={{ marginTop: 'auto' }}
              variant="body"
              fontWeight={'600'}
            >
              {`₹ ${product.price}`}
            </Typography>
          </Stack>
        </Stack>
        <Divider
          sx={{
            borderStyle: 'dashed',
            borderColor: (theme) => theme.palette.grey.light,
            '&::before': {
              borderTopWidth: '1px',
              borderTopStyle: 'dashed',
              borderTopColor: (theme) => theme.palette.grey.light,
              content: '""',
              width: '100%',
              dashArray: '6 10',
            },
          }}
        />
      </Stack>
    </Box>
  );
};

export default ProductListItem;
