import { createMuiTheme } from '@material-ui/core/styles';
import '@material-ui/core/styles';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    lightBackground: Palette['primary'];
  }
  interface PaletteOptions {
    lightBackground: PaletteOptions['primary'];
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FF385C',
    },
    secondary: {
      main: '#00add7',
    },
    background: {
      paper: '#ffffff',
    },
    lightBackground: {
      main: '#f7f7f7',
    },
    text: {
      primary: '#ffffff',
      secondary: '#717171',
    }
  },
});

export default theme;
