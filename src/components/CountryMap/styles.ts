import { createStyles, Theme } from '@material-ui/core/styles';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: theme.spacing(40),
      width: theme.spacing(40),
    },
  });

export default styles;
