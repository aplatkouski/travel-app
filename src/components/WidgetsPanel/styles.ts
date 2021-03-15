import { createStyles, Theme } from '@material-ui/core/styles';

const drawerWidth = 200;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const styles = (theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        position: 'relative',
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    menuButton: {
      position: 'absolute',
      right: 0,
      top: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    drawerPaper: {
      width: drawerWidth,
      [theme.breakpoints.up('sm')]: {
        position: 'relative',
        flexShrink: 0,
      },
    },
  });

export default styles;
