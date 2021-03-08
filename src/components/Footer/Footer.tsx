import { Grid, Link, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import RsSchoolLogo from 'Assets/icons/rsschool-logo.svg';
import ContributorLinks from 'Components/ContributorLinks';
import SvgImg from 'Components/SvgImg';
import contributors from 'Data/contributors.json';
import * as React from 'react';
import classNames from "classnames";

const AppIntro = (): JSX.Element => (
  <Typography color="textSecondary" variant="body2">
    <Link
      color="inherit"
      href="https://github.com/aplatkouski/travel-app"
      title="Travel app source"
      underline="none"
    >
      Travel app
    </Link>
    {`, ${new Date().getFullYear()}.`}
  </Typography>
);

export default function Footer(): JSX.Element {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Grid className={classes.container} container>
        <Grid className={classNames(classes.item, classes.travelApp)} item md sm={12}>
          <AppIntro />
        </Grid>
        <Grid container item md={9} sm={12} justify='center'>
          <ContributorLinks contributors={contributors} />
        </Grid>
        <Grid className={classes.item} item md sm={12}>
          <Link
            color="inherit"
            href="https://rs.school/js/"
            rel="noopener"
            target="_blank"
            underline="none"
          >
            <SvgImg alt="RSSchool logo" src={RsSchoolLogo} title="rs.school" />
          </Link>
        </Grid>
      </Grid>
    </footer>
  );
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flexGrow: 1,
      margin: 'auto',
      maxWidth: '1024px',
      justifyContent: 'center',
      alignItems: 'center',
    },
    footer: {
      backgroundColor: '#f7f7f7',
      flexShrink: 0,
      padding: theme.spacing(0, 2),
      boxShadow: '0px -2px 2px -2px #717171',
    },
    item: {
      color: theme.palette.text.secondary,
      display: 'flex',
      justifyContent: 'center',
      margin: theme.spacing(1, 0),
      "& a:hover":{
        color: '#00add7',
      },
      "& a img": {
        width: '50px',
        height: 'initial',
        transition: 'all 1s ease',
      },
    },
    travelApp: {
      "& p": {
        color: '#FF385C',
        fontWeight: 500,
      },
      display: 'flex',
      justifyContent: 'center',
      margin: theme.spacing(1, 0),
      "& a:hover":{
        color: '#00add7',
      }
    },
  })
);
