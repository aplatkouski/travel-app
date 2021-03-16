import { createStyles, Theme } from '@material-ui/core/styles';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const styles = (theme: Theme) =>
  createStyles({
    root: {
      maxWidth: theme.spacing(60),
      padding: theme.spacing(1.25),
      margin: theme.spacing(2,1),
      background: theme.palette.background.default,
      boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),' +
        ' 0px 1px 3px 0px rgb(0 0 0 / 12%)',
      borderRadius: '5px',
      position: 'relative',
    },
    weather: {
      fontSize: '1.1rem',
      fontFamily: 'Vollkorn SC',
      color: theme.palette.text.secondary,
    },
    widgetHeader: {
      fontSize: '1.5rem',
      alignSelf: 'flex-end',
      color: theme.palette.text.secondary,
      fontFamily: 'Vollkorn SC',
    },
    pin: {
      maxWidth: theme.spacing(3.5),
      width: '100%',
      position: 'absolute',
      top: theme.spacing(-2),
      right: theme.spacing(-1),
    },
  });

export default styles;
