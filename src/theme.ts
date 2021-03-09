import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

// colors
const primary = '#ff385c';
const secondary = '#00add7';

// background
const backgroundPaper = '#fff';
const backgroundDefault = '#f7f7f7';

// text
const textPrimary = '#ff385c';
const textSecondary = '#717171';

const theme = createMuiTheme({
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
