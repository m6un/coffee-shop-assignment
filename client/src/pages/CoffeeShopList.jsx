import { Fade, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  fetchAllCoffeeShops,
  fetchFeaturedCoffeeShops,
  getCityName,
} from '../utils/queryFunctions';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import ShopImageDisplay from '../components/ShopList/ShopImageDisplay';
import Loading from '../components/Loaders/Loading';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import SearchBar from '../components/Search/SearchBar';

// Main component for displaying coffee shop list
const CoffeeShopList = () => {
  const { ref, inView } = useInView();
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [isFetchingCoordinates, setIsFetchingCoordinates] = useState(true);

  // Query for featured coffee shops
  const getFeaturedCoffeeShopsQuery = useQuery({
    queryKey: ['coffeeShops'],
    queryFn: () => fetchFeaturedCoffeeShops(location?.latitude, location?.longitude, true),
    enabled: location !== null && location !== undefined,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  console.log(getFeaturedCoffeeShopsQuery.data);

  const getCityNameQuery = useQuery({
    queryKey: ['cityName', location?.latitude, location?.longitude],
    queryFn: () => getCityName(location?.latitude, location?.longitude),
    enabled: location !== null && location !== undefined,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  // Infinite query for all coffee shops
  const {
    data: allShopsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingAllShops,
    isFetching: isFetchingAllShops,
  } = useInfiniteQuery({
    queryKey: ['allCoffeeShops', location?.latitude, location?.longitude],
    queryFn: ({ pageParam = 0 }) =>
      fetchAllCoffeeShops(location?.latitude, location?.longitude, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: !!location,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  const handleSearch = async (term) => {
    const results = await fetchAllCoffeeShops(location?.latitude, location?.longitude, 0, term);
    return results.coffeeShops;
  };

  useEffect(() => {
    if (getCityNameQuery.data) {
      setCity(
        getCityNameQuery.data.address.city ||
          getCityNameQuery.data.address.town ||
          getCityNameQuery.data.address.village ||
          'Bangalore',
      );
    }
  }, [getCityNameQuery.data]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  // Get user's location
  useEffect(() => {
    const getLocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setIsFetchingCoordinates(false);
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.error('Error getting location:', error);
          },
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    getLocation();
  }, []);

  return (
    <>
      {getFeaturedCoffeeShopsQuery?.isLoading ||
      getFeaturedCoffeeShopsQuery?.isFetching ||
      isFetchingCoordinates ? (
        <Loading />
      ) : (
        <Fade in={true}>
          <Grid
            container
            paddingY={{ xs: 16 }}
            paddingX={{ xs: 6, sm: 12, md: 16, lg: 24 }}
            gap={2}
          >
            <Grid item xs={12}>
              <Stack direction={'column'} gap={2} sx={{ marginBottom: 4 }}>
                <SearchBar onSearch={handleSearch} />
              </Stack>

              {getFeaturedCoffeeShopsQuery?.isLoading ? (
                <Skeleton variant="text" width={'40%'} />
              ) : (
                <Typography variant="h7" color={'secondary.main'}>
                  Featured coffee Shops near you
                </Typography>
              )}

              <Grid container columnSpacing={1} sx={{ marginTop: 2 }}>
                {getFeaturedCoffeeShopsQuery?.data?.coffeeShops?.map((shop) => (
                  <Grid item xs={12} md={6} lg={2} xl={2} key={shop._id}>
                    <Link to={`/shop/${shop?._id}`} style={{ textDecoration: 'none' }}>
                      <ShopImageDisplay
                        image={shop?.images[0]}
                        name={shop?.name}
                        isLoading={getFeaturedCoffeeShopsQuery?.isLoading}
                        distance={shop?.distance}
                        rating={shop?.rating}
                        amenities={shop?.amenities}
                      />
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ display: 'inline-flex' }} variant="h7" color={'secondary.main'}>
                Popular coffee shops in and around{' '}
                {getCityNameQuery?.isLoading ? (
                  <Skeleton sx={{ ml: 1 }} variant="text" width="100px" component="span" />
                ) : (
                  city
                )}
              </Typography>

              <Grid container rowGap={2} columnSpacing={1} sx={{ marginTop: 2 }}>
                {isLoadingAllShops ? (
                  <Loading />
                ) : (
                  allShopsData?.pages.flatMap((page) =>
                    page.coffeeShops.map((shop) => (
                      <Grid item xs={12} md={6} lg={2} xl={2} key={shop._id}>
                        <Link
                          to={`/shop/${shop?._id}`}
                          state={{ city: city }}
                          style={{ textDecoration: 'none' }}
                        >
                          <ShopImageDisplay
                            image={shop?.images[0]}
                            name={shop?.name}
                            distance={shop?.distance}
                            rating={shop?.rating}
                            amenities={shop?.amenities}
                            isLoading={isFetchingAllShops}
                          />
                        </Link>
                      </Grid>
                    )),
                  )
                )}
              </Grid>
              {isFetchingNextPage && <Loading />}
              <div ref={ref} />
            </Grid>
          </Grid>
        </Fade>
      )}
    </>
  );
};

export default CoffeeShopList;
