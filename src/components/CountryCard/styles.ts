import { createStyles, Theme } from '@material-ui/core/styles';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const styles = (theme: Theme) =>
  createStyles({
    root: {
      maxWidth: theme.spacing(60),
      '&:hover': {
        color: theme.palette.secondary.main,
      },
    },
    media: {
      height: theme.spacing(30),
      transition: 'all .5s',
      '&:hover': {
        transform: 'scale(1.2)',
        backgroundPositionY: '-18px',
      },
    },
    capital: {
      color: theme.palette.text.secondary,
    },
  });

export default styles;
