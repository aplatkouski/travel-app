import { createStyles, Theme } from '@material-ui/core/styles';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const styles = (theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        position: 'relative',
        flexShrink: 0,
      },
      '& > div': {
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
      alignItems: 'center',
      width: theme.spacing(31.25),
      height: '100%',
      [theme.breakpoints.up('sm')]: {
        position: 'relative',
        flexShrink: 0,
      },
      [theme.breakpoints.up('lg')]: {
        justifyContent: 'space-around',
      },
    },
    drawerRoot: {
      height: '100%',
      borderLeft: '1px solid lightgrey',
    },
    image: {
      width: '40%',
    },
  });

export default styles;
