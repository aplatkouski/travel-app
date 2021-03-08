import { Button, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clouds from 'Assets/images/illustration-clouds.png';
import plane from 'Assets/images/illustration-plane.png';
import logo from 'Assets/images/logo.png';
import LanguageSelector from 'Components/LanguageSelector';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = (): JSX.Element => {
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
          <Button className={classes.button} color="secondary" variant="outlined">
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
          <span>input search</span>
        </Grid>
      </Grid>
    </Grid>
  );
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      boxShadow: '0px 2px 2px -2px #717171',
      height: '7rem',
      padding: '0.5rem 0 0.5rem 1rem',
      background: '#fff',
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
      maxWidth: '288px',
      width: '40%',
      [theme.breakpoints.down('xs')]: {
        width: '60%',
      },
      objectFit: 'contain',
    },
    planeImg: {
      maxWidth: '288px',
      width: '40%',
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
      objectFit: 'contain',
    },
    logo: {
      maxWidth: '110px',
      objectFit: 'contain',
      transition: 'all 2s ease-in',
      '&:hover': {
        transform: 'rotate(360deg)',
        transition: 'all 2s ease-in',
      },
    },
    buttonsContainer: {
      height: '100%',
    },
    button: {
      color: '#ff385c',
      border: '1px solid #FF385C',
      marginRight: '1rem',
    },
  })
);
export default Header;
