import { Box, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { TypographyEllipsis } from '../StyledComponents';
import RatingStars from './RatingStars';
import SmokingRoomsRoundedIcon from '@mui/icons-material/SmokingRoomsRounded';
import WifiRoundedIcon from '@mui/icons-material/WifiRounded';
import DeckRoundedIcon from '@mui/icons-material/DeckRounded';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import OutletRoundedIcon from '@mui/icons-material/OutletRounded';

const ShopImageDisplay = ({ image, name, distance, rating, amenities, isLoading }) => {
  const distanceInKms = Math.round(distance / 1000);
  return (
    <Box
      sx={(theme) => ({
        padding: 1.5,
        borderRadius: '10px',
        '&:hover': {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          transition: 'box-shadow 0.3s ease-in-out',
          outline: `1px solid ${theme.palette.grey.lighter}`,
        },
      })}
    >
      <Stack direction="column" gap={0.25}>
        <Box position="relative" sx={{ paddingTop: '66.67%', overflow: 'hidden' }}>
          {isLoading ? (
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
          ) : (
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
              src={image}
              alt={name}
              onLoad={(e) => (e.target.style.opacity = 1)}
            />
          )}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            borderRadius="8px"
            sx={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0, 0, 0, 0.657) 100%)',
            }}
          />
          <Box position="absolute" bottom={0} left={0} p={1} display="flex" alignItems="center">
            <RatingStars rating={rating} />
          </Box>
        </Box>
        <Stack direction={'column'} gap={0.25}>
          <TypographyEllipsis variant="body" color={'secondary.main'} fontWeight={600}>
            {name}
          </TypographyEllipsis>
          <Typography variant="body" color={'secondary.main'} fontWeight={400}>
            {distanceInKms} kms
          </Typography>
        </Stack>
        <Stack direction={'row'} spacing={1}>
          {amenities?.smoking && (
            <Tooltip
              slotProps={{
                tooltip: {
                  sx: { backgroundColor: (theme) => theme.palette.secondary.main },
                },
              }}
              title={
                <Typography variant="caption" fontWeight={600}>
                  Smoking allowed
                </Typography>
              }
              placement="top"
            >
              <Stack direction={'row'} spacing={1}>
                <SmokingRoomsRoundedIcon
                  sx={{
                    fontSize: '13px',
                    color: (theme) => theme.palette.grey.light,
                    ':hover': { color: (theme) => theme.palette.grey.main },
                  }}
                />
              </Stack>
            </Tooltip>
          )}
          {amenities?.wifi && (
            <Tooltip
              slotProps={{
                tooltip: {
                  sx: { backgroundColor: (theme) => theme.palette.secondary.main },
                },
              }}
              title={
                <Typography variant="caption" fontWeight={600}>
                  Wifi available
                </Typography>
              }
              placement="top"
            >
              <Stack direction={'row'} spacing={1}>
                <WifiRoundedIcon
                  sx={{
                    fontSize: '13px',
                    color: (theme) => theme.palette.grey.light,
                    ':hover': { color: (theme) => theme.palette.grey.main },
                  }}
                />
              </Stack>
            </Tooltip>
          )}
          {amenities?.outdoor_seating && (
            <Tooltip
              slotProps={{
                tooltip: {
                  sx: { backgroundColor: (theme) => theme.palette.secondary.main },
                },
              }}
              title={
                <Typography variant="caption" fontWeight={600}>
                  Outdoor seating
                </Typography>
              }
              placement="top"
            >
              <Stack direction={'row'} spacing={1}>
                <DeckRoundedIcon
                  sx={{
                    fontSize: '13px',
                    color: (theme) => theme.palette.grey.light,
                    ':hover': { color: (theme) => theme.palette.grey.main },
                  }}
                />
              </Stack>
            </Tooltip>
          )}
          {amenities?.pet_friendly && (
            <Tooltip
              slotProps={{
                tooltip: {
                  sx: { backgroundColor: (theme) => theme.palette.secondary.main },
                },
              }}
              title={
                <Typography variant="caption" fontWeight={600}>
                  Pet Friendly
                </Typography>
              }
              placement="top"
            >
              <Stack direction={'row'} spacing={1}>
                <PetsRoundedIcon
                  sx={{
                    fontSize: '13px',
                    color: (theme) => theme.palette.grey.light,
                    ':hover': { color: (theme) => theme.palette.grey.main },
                  }}
                />
              </Stack>
            </Tooltip>
          )}
          {amenities?.power_outlets && (
            <Tooltip
              slotProps={{
                tooltip: {
                  sx: { backgroundColor: (theme) => theme.palette.secondary.main },
                },
              }}
              title={
                <Typography variant="caption" fontWeight={600}>
                  Power outlets available
                </Typography>
              }
              placement="top"
            >
              <Stack direction={'row'} spacing={1}>
                <OutletRoundedIcon
                  sx={{
                    fontSize: '13px',
                    color: (theme) => theme.palette.grey.light,
                    ':hover': { color: (theme) => theme.palette.grey.main },
                  }}
                />
              </Stack>
            </Tooltip>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ShopImageDisplay;
