import { Button, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clouds from 'Assets/images/illustration-clouds.png';
import plane from 'Assets/images/illustration-plane.png';
import logo from 'Assets/images/logo.png';
import LanguageSelector from 'Components/LanguageSelector';
import SearchField from 'Components/SearchField';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import user from 'States/user';

interface Props {
  onOpenRegistrationForm: () => void;
}

const Header = ({
  onOpenRegistrationForm: handleOpenRegistrationForm,
}: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid className={classes.header} container>
      <div className={classes.exp}>
        <div className={classes.exp1}>
          <img alt="clouds" className={classes.cloudsImg} src={clouds} />
          <Link to="/">
            <img alt="logo" className={classes.logo} src={logo} />
          </Link>
          <img alt="plane" className={classes.planeImg} src={plane} />
        </div>
      </div>

      <Grid item xs={2}>
        <LanguageSelector />
      </Grid>

      <Grid
        className={classes.buttonsContainer}
        container
        direction="column"
        item
        justify="space-between"
        xs={10}
      >
        <Grid container item justify="flex-end">
          <Button
            className={classes.button}
            color="secondary"
            onClick={handleOpenRegistrationForm}
            variant="outlined"
          >
            Sign up
          </Button>
          <Button className={classes.button} color="secondary" variant="outlined">
            Login
          </Button>
          <Button className={classes.button} color="secondary" variant="outlined">
            Logout
          </Button>
        </Grid>
        <Grid container justify="flex-end">
          <SearchField />
        </Grid>
      </Grid>
    </Grid>
  );
};

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

const mapDispatchToProps = {
  onOpenRegistrationForm: user.actions.openRegistrationForm,
};

export default connect(null, mapDispatchToProps)(Header);
