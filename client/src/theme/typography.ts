function pxToRem(value: number): string {
  return `${value / 16}rem`;
}

type IResponseFontSizes = {
  sm: number;
  md: number;
  lg: number;
};

function responsiveFontSizes({ sm, md, lg }: IResponseFontSizes) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

export const FONT_PRIMARY = '"Poppins", sans-serif';

const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 700,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
  },
  h2: {
    fontWeight: 700,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
  },
  h3: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 24, md: 30, lg: 36 }),
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
  },
  h5: {
    fontWeight: 600,
    lineHeight: 1.25,
    fontSize: pxToRem(19),
    ...responsiveFontSizes({ sm: 20, md: 22, lg: 22 }),
  },
  h6: {
    fontWeight: 600,
    lineHeight: 28 / 18,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 16, md: 18, lg: 18 }),
  },
  h7: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
    ...responsiveFontSizes({ sm: 14, md: 16, lg: 16 }),
  },
  body: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(13),
    fontFamly: FONT_PRIMARY,
    // ...responsiveFontSizes({ sm: 14, md: 14, lg: 14 }),
  },
  caption: {
    lineHeight: 1.5,
    fontweight: 700,
    fontSize: pxToRem(12),
    ...responsiveFontSizes({ sm: 10, md: 10, lg: 10 }),
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'capitalize',
  },
};

export default typography;
