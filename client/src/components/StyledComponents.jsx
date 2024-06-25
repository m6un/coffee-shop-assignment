import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

const FlexBox = styled(Box)({
  display: 'flex',
});

const CenteredFlexBox = styled(FlexBox)({
  justifyContent: 'center',
  alignItems: 'center',
});

const FullSizeFlexBox = styled(FlexBox)({
  height: '100%',
  width: '100%',
});

const FullSizeCenteredFlexBox = styled(CenteredFlexBox)({
  width: '100%',
  height: '100%',
});

const Bold = (props) => (
  <Typography component="b" fontWeight={700} color="primary.main" fontSize="inherit" {...props} />
);
const HeaderTextContainer = styled(FlexBox)({
  flexDirection: 'column',
  gap: '8px',
});

const TypographyEllipsis = styled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export {
  FlexBox,
  CenteredFlexBox,
  FullSizeFlexBox,
  FullSizeCenteredFlexBox,
  HeaderTextContainer,
  TypographyEllipsis,
  Bold,
};
