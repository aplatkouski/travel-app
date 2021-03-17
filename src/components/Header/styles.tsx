import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      background: theme.palette.background.paper,
      boxShadow: `0 2px 2px -2px ${theme.palette.text.secondary}`,
      height: '7rem',
      padding: '.5rem 0 .5rem 1rem',
      position: 'relative',
    },
    exp: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    exp1: {
      position: 'absolute',
      display: 'flex',
      width: '73%',
      justifyContent: 'space-between',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'row-reverse',
      },
    },
    cloudsImg: {
      maxWidth: theme.spacing(36),
      width: '40%',
      [theme.breakpoints.down('xs')]: {
        width: '60%',
      },
      objectFit: 'contain',
    },
    planeImg: {
      maxWidth: theme.spacing(36),
      width: '40%',
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
      objectFit: 'contain',
    },
    logo: {
      maxWidth: theme.spacing(14),
      objectFit: 'contain',
      transition: 'all 2s ease-in',
      '&:hover': {
        transform: 'rotate(360deg)',
        transition: 'all 2s ease-in',
        transformOrigin: '49% 58%',
      },
    },
    buttonsContainer: {
      height: '100%',
    },
    button: {
      color: theme.palette.text.primary,
      borderWith: '1px',
      borderStyle: 'solid',
      borderColor: theme.palette.primary.main,
      marginRight: '1rem',
    },
  })
);

export default useStyles;
