import { Grid, Link, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import RsSchoolLogo from 'Assets/icons/rsschool-logo.svg';
import ContributorLinks from 'Components/ContributorLinks';
import SvgImg from 'Components/SvgImg';
import contributors from 'Data/contributors.json';
import * as React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flexGrow: 1,
      margin: 'auto',
      maxWidth: '1024px',
      justifyContent: 'center',
    },
    footer: {
      backgroundColor:
        theme.palette.type === 'light'
          ? theme.palette.grey[200]
          : theme.palette.grey[800],
      flexShrink: 0,
      padding: theme.spacing(3, 2),
    },
    item: {
      color: theme.palette.text.secondary,
      display: 'flex',
      justifyContent: 'center',
      margin: theme.spacing(1, 0),
    },
  })
);

const AppIntro = () => (
  <Typography color="textSecondary" variant="body2">
    <Link
      color="inherit"
      href="https://github.com/aplatkouski/travel-app"
      title="Travel app source"
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
        <Grid className={classes.item} item md sm={12}>
          <AppIntro />
        </Grid>
        <Grid container item md={9} sm={12}>
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
