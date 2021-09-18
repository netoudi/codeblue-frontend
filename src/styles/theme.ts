import { createTheme } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

const palette: PaletteOptions = {
  type: 'dark',
  primary: {
    main: blue[800],
    contrastText: '#fff',
  },
  background: {
    default: '#242526',
  },
};

const theme = createTheme({
  palette,
  overrides: {
    MuiCssBaseline: {
      '@global': {
        'html, body, body > div': {
          height: '100%',
        },
      },
    },
  },
});

export default theme;
