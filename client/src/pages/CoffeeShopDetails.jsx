import { useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';
import { getCoffeeShopDetails } from '../utils/queryFunctions';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import SmokingRoomsRoundedIcon from '@mui/icons-material/SmokingRoomsRounded';
import WifiRoundedIcon from '@mui/icons-material/WifiRounded';
import DeckRoundedIcon from '@mui/icons-material/DeckRounded';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import OutletRoundedIcon from '@mui/icons-material/OutletRounded';
import ProductListItem from '../components/ShopDetails/ProductListItem';
import CoffeeRoundedIcon from '@mui/icons-material/CoffeeRounded';
import LunchDiningRoundedIcon from '@mui/icons-material/LunchDiningRounded';
import { useEffect, useRef, useState } from 'react';
import LeafletContainer from '../components/ShopDetails/LeafletContainer';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@emotion/react';

const CoffeeShopDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const productRef = useRef(null);
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get('productId');
  const tabParam = searchParams.get('tab');

  const initialiseCoffeeTab = tabParam === 'Food' ? false : true;
  const [isCoffee, setIsCoffee] = useState(initialiseCoffeeTab);

  const { id } = useParams();
  const coffeeShopDetailsQuery = useQuery({
    queryKey: [`${id}-coffee-shop-details`],
    queryFn: () => getCoffeeShopDetails(id),
    disabled: !id,
  });

  useEffect(() => {
    if (productId && productRef.current) {
      productRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [productId, coffeeShopDetailsQuery?.data]);

  const city = location?.state?.city || 'Bangalore';

  const theme = useTheme();

  const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <>
      {!coffeeShopDetailsQuery?.isLoading && (
        <Grid
          container
          paddingTop={{ xs: 12 }}
          paddingBottom={{ xs: 12 }}
          paddingX={{ xs: 6, sm: 12, md: 16, lg: 24 }}
          rowSpacing={2.5}
          columnSpacing={4}
        >
          <Grid item xs={12}>
            <Stack direction="column" spacing={1}>
              <Box position="relative">
                <IconButton
                  onClick={() => navigate('/')}
                  sx={{
                    alignSelf: 'flex-start',
                    position: 'absolute',
                    top: 30,
                    left: 10,
                    zIndex: 1,
                    padding: '6px',
                    backgroundColor: (theme) => theme.palette.appwhite.main,
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette.appwhite.main,
                    },
                  }}
                >
                  <ArrowBackIcon
                    sx={{ color: (theme) => theme.palette.primary.main, fontSize: '16px' }}
                  />
                </IconButton>
                <img
                  style={{
                    borderRadius: '8px',
                    marginTop: '20px',
                    height: '300px',
                    width: '100%',
                    objectFit: 'cover',
                    opacity: 0,
                    transition: 'opacity 0.3s ease-in-out',
                  }}
                  src={coffeeShopDetailsQuery?.data?.images[0]}
                  alt={coffeeShopDetailsQuery?.data?.name}
                  onLoad={(e) => (e.target.style.opacity = 1)}
                />
              </Box>
              <Stack direction={'column'} spacing={1}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                  <Stack direction={'column'} spacing={0}>
                    <Typography variant="h4">{coffeeShopDetailsQuery?.data?.name}</Typography>
                    <Typography variant="body" color={'secondary.main'} fontWeight={500}>
                      {city}
                    </Typography>
                  </Stack>
                  <Stack
                    marginTop={'6px'}
                    alignSelf={'flex-start'}
                    alignItems={'center'}
                    direction={'row'}
                    sx={{ backgroundColor: (theme) => theme.palette.primary.main }}
                    paddingY={'4px'}
                    paddingRight={'8px'}
                    paddingLeft={'6px'}
                    borderRadius={'4px'}
                  >
                    <StarRoundedIcon
                      sx={{ fontSize: '20px', color: (theme) => theme.palette.appwhite.main }}
                    />

                    <Typography variant="h7" color={'appwhite.main'} fontWeight={700}>
                      {coffeeShopDetailsQuery?.data?.rating}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction={'row'} spacing={2}>
                  {coffeeShopDetailsQuery?.data?.amenities.smoking && (
                    <Stack direction={'row'} spacing={0.5}>
                      <SmokingRoomsRoundedIcon
                        sx={{ fontSize: '16px', color: (theme) => theme.palette.grey.light }}
                      />
                      {!isLgDown && (
                        <Typography fontSize={'13px'} color={'grey.light'} fontWeight={500}>
                          Smoking allowed
                        </Typography>
                      )}
                    </Stack>
                  )}
                  {coffeeShopDetailsQuery?.data?.amenities.wifi && (
                    <Stack direction={'row'} spacing={0.5}>
                      <WifiRoundedIcon
                        sx={{ fontSize: '16px', color: (theme) => theme.palette.grey.light }}
                      />
                      {!isLgDown && (
                        <Typography fontSize={'13px'} color={'grey.light'} fontWeight={500}>
                          Wifi available
                        </Typography>
                      )}
                    </Stack>
                  )}
                  {coffeeShopDetailsQuery?.data?.amenities.outdoor_seating && (
                    <Stack direction={'row'} spacing={0.5}>
                      <DeckRoundedIcon
                        sx={{ fontSize: '16px', color: (theme) => theme.palette.grey.light }}
                      />
                      {!isLgDown && (
                        <Typography fontSize={'13px'} color={'grey.light'} fontWeight={500}>
                          Outdoor seating
                        </Typography>
                      )}
                    </Stack>
                  )}
                  {coffeeShopDetailsQuery?.data?.amenities.pet_friendly && (
                    <Stack direction={'row'} spacing={0.5}>
                      <PetsRoundedIcon
                        sx={{ fontSize: '16px', color: (theme) => theme.palette.grey.light }}
                      />
                      {!isLgDown && (
                        <Typography fontSize={'13px'} color={'grey.light'} fontWeight={500}>
                          Pet Friendly
                        </Typography>
                      )}
                    </Stack>
                  )}
                  {coffeeShopDetailsQuery?.data?.amenities.power_outlets && (
                    <Stack direction={'row'} spacing={0.5}>
                      <OutletRoundedIcon
                        sx={{ fontSize: '16px', color: (theme) => theme.palette.grey.light }}
                      />
                      {!isLgDown && (
                        <Typography fontSize={'13px'} color={'grey.light'} fontWeight={500}>
                          Power outlets available
                        </Typography>
                      )}
                    </Stack>
                  )}
                </Stack>
                <Divider sx={{ borderColor: (theme) => theme.palette.grey.lighter }} />
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={8} lg={8} xl={8}>
            <Stack direction={'column'} gap={2}>
              <Tabs
                value={isCoffee ? 0 : 1}
                onChange={(e, newValue) => setIsCoffee(newValue === 0)}
                sx={{ '.MuiTabs-flexContainer': { gap: 2 } }}
                TabIndicatorProps={{ style: { width: isCoffee ? '90px' : '90px', bottom: 8 } }}
              >
                <Tab
                  icon={<CoffeeRoundedIcon sx={{ fontSize: '22px' }} />}
                  iconPosition="start"
                  disableRipple
                  sx={{
                    fontSize: '16px',
                    fontWeight: 500,
                    minHeight: '40px',
                    height: '40px',
                    paddingLeft: 0,
                  }}
                  label={
                    <Typography variant="body" fontWeight={600}>
                      Coffee
                    </Typography>
                  }
                />
                <Tab
                  icon={<LunchDiningRoundedIcon sx={{ fontSize: '22px' }} />}
                  iconPosition="start"
                  disableRipple
                  label={
                    <Typography variant="body" fontWeight={600}>
                      Food
                    </Typography>
                  }
                  sx={{
                    fontSize: '16px',
                    fontWeight: 500,
                    minHeight: '40px',
                    height: '40px',
                    paddingLeft: 0,
                  }}
                />
              </Tabs>
              {isCoffee
                ? coffeeShopDetailsQuery?.data?.products
                    .filter((product) => product.category === 'Coffee')
                    ?.map((product) => <ProductListItem key={product._id} product={product} />)
                : coffeeShopDetailsQuery?.data?.products
                    .filter((product) => product.category === 'Food')
                    ?.map((product) => <ProductListItem key={product._id} product={product} />)}
            </Stack>
          </Grid>
          <Grid item xs={12} md={4} lg={4} xl={4}>
            <LeafletContainer
              latitude={coffeeShopDetailsQuery?.data?.location?.coordinates[1]}
              longitude={coffeeShopDetailsQuery?.data?.location?.coordinates[0]}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default CoffeeShopDetails;
