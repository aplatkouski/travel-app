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
      borderRadius: '5px',
      overflow: 'hidden',
      boxShadow:
        '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
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
      boxShadow:
        '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    },
  });

export default styles;
