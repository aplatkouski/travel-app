import { createStyles, Theme } from '@material-ui/core/styles';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      margin: theme.spacing(0, 1),
    },
    large: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      marginRight: theme.spacing(1),
    },
  });

export default styles;
