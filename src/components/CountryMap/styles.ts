import { createStyles, Theme } from '@material-ui/core/styles';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      boxShadow: '0 0.25em 1em rgb(0 0 0 / 20%)',
      width: '100%',
      height: '100%',
      position: 'relative',
    },
    map: {
      height: '100%',
      width: '100%',
    },
    fullScreenBtn: {
      position: 'absolute',
      top: theme.spacing(2),
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
