export default function CssBaseline() {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        // Reset default styles for all elements
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        },
        // Set full width and height for html and enable smooth scrolling on iOS
        html: {
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
        },
        // Set full width and height for body with white background
        body: {
          width: '100%',
          height: '100%',
          backgroundColor: '#ffffff',
        },
        // Ensure root element takes full width and height
        '#root': {
          width: '100%',
          height: '100%',
        },
        // Remove spinner buttons from number inputs
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        // Ensure images are responsive
        img: {
          display: 'block',
          maxWidth: '100%',
        },
      },
    },
  };
}
