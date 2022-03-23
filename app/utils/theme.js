const spacing = 8; // in px
const fontSize = 14;
const fontWeightLight = 300;
const fontWeightRegular = 400;
const fontWeightMedium = 500;
const fontWeightSemiBold = 600;
const fontWeightBold = 700;
const fontFamily = "'Nunito', 'Roboto', 'Open Sans', sans-serif";

const base = {
  typography: {
    htmlFontSize: 16,
    fontSize,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightSemiBold,
    fontWeightBold,
    fontFamily,
    h1: {
      fontSize: '9.6rem',
    },
    h2: {
      fontSize: '6rem',
    },
    h3: {
      fontSize: '4.8rem',
    },
    h4: {
      fontSize: '3.4rem',
    },
    h5: {
      fontSize: '2.2rem',
      fontWeight: fontWeightSemiBold,
    },
    h6: {
      fontSize: '1.8rem',
    },
    subtitle1: {
      fontSize: '1.6rem',
      fontWeight: fontWeightMedium,
    },
    subtitle2: {
      fontSize: '1.5rem',
    },
    body1: {
      fontSize: '1.4rem',
    },
    body2: {
      fontSize: '1.3rem',
    },
    button: {
      fontSize: '1.3rem',
      textTransform: 'initial',
    },
    caption: {
      fontSize: '1.2rem',
    },
    overline: {
      fontSize: '1rem',
      textTransform: 'initial',
    },
  },
  shape: {
    borderRadius: 6,
    borderRadiusLarge: 15,
  },
  spacing,
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'initial',
        },
      },
    },
    MuiUseMediaQuery: {
      defaultProps: {
        noSsr: true,
      },
    },
    MuiButton: {
      variants: [
        {
          props: { size: 'small' },
          style: {
            fontSize: '1.2rem',
          },
        },
        {
          props: { size: 'medium' },
          style: {
            fontSize: '1.3rem',
          },
        },
        {
          props: { size: 'large' },
          style: {
            fontSize: '1.5rem',
          },
        },
      ],
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: 'inherit',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'initial',
        },
      },
    },
    MuiChip: {
      variants: [
        {
          props: { size: 'extra-small' },
          style: {
            fontSize: '1rem',
            height: 18,
            '& .MuiChip-labelExtra-small': {
              padding: `2px 8px`,
            },
            '& .MuiChip-iconExtra-small': {
              fontSize: '1rem',
            },
          },
        },
        {
          props: { size: 'small' },
          style: {
            fontSize: '1.1rem',
          },
        },
        {
          props: { size: 'medium' },
          style: {
            fontSize: '1.2rem',
          },
        },
      ],
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: spacing * 2,
          },
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        label: {
          fontSize: '1.1rem',
          fontWeight: fontWeightMedium,
          '&.Mui-selected': {
            fontSize: '1.2rem',
          },
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontSize: '1.2rem',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: '2.2rem',
        },
        fontSizeSmall: {
          fontSize: '1.8rem',
        },
        fontSizeLarge: {
          fontSize: '3.2rem',
        },
      },
    },
  },
};

export const baseLight = {
  palette: {
    mode: 'light',
    primary: {
      // light: '#333333',
      // main: '#161A1D',
      // dark: '#0f1214',
      // contrastText: '#fff',
      light: '#93b8b8',
      main: '#79A7A7',
      dark: '#547474',
      contrastText: '#fff',
    },
    secondary: {
      light: '#77816f',
      main: '#55624C',
      dark: '#3b4435',
      contrastText: '#fff',
    },
    text: {
      primary: '#212121',
      secondary: '#666666',
      tertiary: '#9E9E9E',
      icon: '#000000',
    },
    background: {
      default: '#F0F2F5',
      paper: '#FAFAFA',
      navigation: '#000',
    },
  },
  typography: base.typography,
  shape: base.shape,
  overrides: base.overrides,
  components: {
    ...base.components,
  },
};

export const baseDark = {
  palette: {
    mode: 'dark',
    primary: {
      light: '#33ab9f',
      main: '#009688',
      dark: '#00695f',
      contrastText: '#fff',
    },
    error: {
      light: '#d88493',
      main: '#CF6679',
      dark: '#904754',
      contrastText: '#fff',
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#A0A0A0',
      tertiary: '#6C6C6C',
      icon: 'rgba(255, 255, 255, 0.5)',
    },
    background: {
      default: '#121212',
      paper: '#272727',
      navigation: '#1E1E1E',
      level1: '#121212',
      level2: '#1E1E1E',
      level3: '#242424',
      level4: '#2C2C2C',
      level5: '#323232',
    },
  },
  typography: base.typography,
  shape: base.shape,
  overrides: base.overrides,
  components: {
    ...base.components,
  },
};

export default baseLight;
