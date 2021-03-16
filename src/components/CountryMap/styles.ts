import { createStyles, Theme } from '@material-ui/core/styles';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const styles = (theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      height: theme.spacing(40),
      width: theme.spacing(40),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: theme.shape.borderRadius,
      overflow: 'hidden',
      boxShadow: theme.shadows[1],
    },
    map: {
      height: '100%',
      width: '100%',
    },
    fullScreenBtn: {
      position: 'absolute',
      top: theme.spacing(1),
      right: theme.spacing(1),
      zIndex: 1000,
      background: 'transparent',
      transition: 'all .5s ease',
      '&:hover': {
        transform: 'scale(1.3)',
      },
    },
    flag: {
      width: '60px',
      height: '35px',
      objectFit: 'cover',
      objectPosition: 'center',
      borderRadius: '2px',
      boxShadow: theme.shadows[1],
    },
  });

export default styles;
