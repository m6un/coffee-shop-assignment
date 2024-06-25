import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button, Skeleton, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import ForkRightRoundedIcon from '@mui/icons-material/ForkRightRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { LoadingButton } from '@mui/lab';

const LeafletContainer = ({ latitude, longitude }) => {
  const [address, setAddress] = useState('');
  const [isAddressCopied, setAddressCopied] = useState(false);
  const [isDirectionLoading, setDirectionLoading] = useState(false);
  const addressCache = new Map();

  // Fetch address from coordinates
  const fetchAddress = useCallback(async (lat, lon) => {
    const cacheKey = `${lat},${lon}`;
    if (addressCache.has(cacheKey)) {
      return addressCache.get(cacheKey);
    }

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
    );
    const data = await response.json();
    addressCache.set(cacheKey, data.display_name);
    return data.display_name;
  }, []);

  // Fetch address on component mount
  useEffect(() => {
    let isMounted = true;
    fetchAddress(latitude, longitude)
      .then((fetchedAddress) => {
        if (isMounted) setAddress(fetchedAddress);
      })
      .catch((error) => console.error('Error fetching address:', error));
    return () => {
      isMounted = false;
    };
  }, [latitude, longitude, fetchAddress]);

  // Handle direction button click
  const handleGetDirection = () => {
    setDirectionLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: userLat, longitude: userLon } = position.coords;
          const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLon}&destination=${latitude},${longitude}`;
          window.open(url, '_blank');
        },
        (error) => {
          console.error('Error getting user location:', error);
          // Fallback to just destination if user location is not available
          const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
          window.open(url, '_blank');
        },
      );
    } else {
      // Fallback for browsers that don't support geolocation
      const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
      window.open(url, '_blank');
    }
    setDirectionLoading(false);
  };

  // Handle copy address button click
  const handleCopyAddress = () => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        setAddressCopied(true);
        setTimeout(() => setAddressCopied(false), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy address: ', err);
        setAddressCopied(false);
      });
  };

  return (
    <Stack direction="column" gap={2}>
      <Stack direction={'column'} gap={1}>
        <Typography variant="h7">Direction</Typography>
        <div
          style={{
            height: '300px',
            width: '100%',
            border: '1px solid #e1e1e1',
            padding: '8px',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <MapContainer
            center={[latitude, longitude]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              minZoom={0}
              maxZoom={30}
            />
            <Marker position={[latitude, longitude]} />
          </MapContainer>
        </div>
      </Stack>
      <Stack direction={'column'} gap={1}>
        {!address ? (
          <Skeleton variant="text" width={'70%'} height={'20.422px'} />
        ) : (
          <Typography variant="body" color={'grey.main'} fontWeight={400}>
            Address: {address}
          </Typography>
        )}
        <Stack direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }} gap={1}>
          <LoadingButton
            loading={isDirectionLoading}
            startIcon={<ForkRightRoundedIcon sx={{ height: '18px', width: '18px' }} />}
            sx={{ height: '35px' }}
            variant="contained"
            color="primary"
            onClick={handleGetDirection}
          >
            <Typography variant="body" fontWeight={500}>
              Get Directions
            </Typography>
          </LoadingButton>
          <Button
            startIcon={
              isAddressCopied ? (
                <CheckRoundedIcon sx={{ height: '16px', width: '16px' }} />
              ) : (
                <ContentCopyRoundedIcon sx={{ height: '16px', width: '16px' }} />
              )
            }
            sx={{ height: '35px' }}
            variant="outlined"
            color="primary"
            onClick={handleCopyAddress}
          >
            <Typography variant="body" fontWeight={500}>
              {isAddressCopied ? 'Copied' : 'Copy address'}
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LeafletContainer;
