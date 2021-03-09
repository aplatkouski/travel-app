import { Grid, Link, Typography } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import RsSchoolLogo from 'Assets/icons/rsschool-logo.svg';
import clsx from 'clsx';
import ContributorLinks from 'Components/ContributorLinks';
import SvgImg from 'Components/SvgImg';
import contributors from 'Data/contributors.json';
import * as React from 'react';
import styles from './styles';

type Props = WithStyles<typeof styles>;

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

const Footer = ({ classes }: Props): JSX.Element => (
  <footer className={classes.footer}>
    <Grid className={classes.container} container>
      <Grid className={clsx(classes.item, classes.travelApp)} item md sm={12}>
        <AppIntro />
      </Grid>
      <Grid container item justify="center" md={9} sm={12}>
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

export default withStyles(styles, { withTheme: true })(Footer);
