import { createStyles, Theme } from '@material-ui/core/styles';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const styles = (theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        position: 'relative',
        flexShrink: 0,
      },
      "& > div": {
        height: '100%',
      },
    },
    menuButton: {
      position: 'absolute',
      right: 0,
      zIndex: 1000,
      top: theme.spacing(2),
      [theme.breakpoints.up('lg')]: {
        display: 'none',
      },
    },
    drawerPaper: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '250px',
      height: '100%',
      [theme.breakpoints.up('sm')]: {
        position: 'relative',
        flexShrink: 0,
      },
    },
    drawerRoot: {
      height: '100%',
    },
    image: {
      width: '40%',
    },
  });

export default styles;
