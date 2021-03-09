import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

// breakpoints
const xl = 1920;
const lg = 1280;
const md = 960;
const sm = 500;
const xs = 0;

// colors
const primary = '#ff385c';
const secondary = '#00add7';

// background
const backgroundPaper = '#fff';
const backgroundDefault = '#f7f7f7';

// text
const textPrimary = '#fff';
const textSecondary = '#717171';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs,
      sm,
      md,
      lg,
      xl,
    },
  },
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
    background: {
      paper: backgroundPaper,
      default: backgroundDefault,
    },
    text: {
      primary: textPrimary,
      secondary: textSecondary,
    },
  },
});

export default responsiveFontSizes(theme);
