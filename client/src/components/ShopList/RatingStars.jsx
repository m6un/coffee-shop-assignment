import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { Stack, Typography } from '@mui/material';

const RatingStars = ({ rating }) => {
  return (
    <Stack
      alignItems={'center'}
      justifyContent={'center'}
      direction={'row'}
      paddingRight={'8px'}
      paddingLeft={'4px'}
      paddingY={'2px'}
      height={'18px'}
      borderRadius={'50px'}
      bgcolor={'white'}
    >
      <StarRoundedIcon
        sx={{
          fontSize: '12px',
          pb: '1px',
          mr: '2px',
          color: (theme) => theme.palette.primary.main,
        }}
      />

      <Typography variant="body" color={'primary.main'} fontWeight={600} fontSize={'10px'}>
        {rating}
      </Typography>
    </Stack>
  );
};

export default RatingStars;
