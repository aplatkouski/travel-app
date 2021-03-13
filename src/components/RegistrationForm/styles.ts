import { createStyles, Theme } from '@material-ui/core/styles';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const styles = (theme: Theme) =>
  createStyles({
    button: {
      color: theme.palette.text.primary,
      borderWith: '1px',
      borderStyle: 'solid',
      borderColor: theme.palette.primary.main,
      marginRight: '1rem',
    },
  });

export default styles;
