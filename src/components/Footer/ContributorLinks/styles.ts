import { createStyles, Theme } from '@material-ui/core/styles';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const styles = (theme: Theme) =>
  createStyles({
    item: {
      color: theme.palette.text.secondary,
      margin: theme.spacing(1, 0),
      minWidth: theme.spacing(20),
      textAlign: 'center',
    },
    link: {
      color: theme.palette.text.secondary,
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      '&:hover': {
        color: theme.palette.secondary.main,
      },
      '& > *': {
        marginLeft: theme.spacing(1),
        transition: 'all 1s ease',
      },
    },
  });

export default styles;
