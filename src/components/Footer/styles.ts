import { createStyles, Theme } from '@material-ui/core/styles';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const styles = (theme: Theme) =>
  createStyles({
    container: {
      flexGrow: 1,
      margin: 'auto',
      maxWidth: '1024px',
      justifyContent: 'center',
      alignItems: 'center',
    },
    footer: {
      backgroundColor: theme.palette.background.default,
      flexShrink: 0,
      padding: theme.spacing(0, 2),
      boxShadow: '0px -2px 2px -2px #717171',
    },
    item: {
      color: theme.palette.text.secondary,
      display: 'flex',
      justifyContent: 'center',
      margin: theme.spacing(1, 0),
      '& a:hover': {
        color: theme.palette.secondary.main,
      },
      '& a img': {
        width: '50px',
        height: 'initial',
        transition: 'all 1s ease',
      },
    },
    travelApp: {
      '& p': {
        color: theme.palette.primary.main,
        fontWeight: 500,
      },
      display: 'flex',
      justifyContent: 'center',
      margin: theme.spacing(1, 0),
      '& a:hover': {
        color: theme.palette.secondary.main,
      },
    },
  });

export default styles;
