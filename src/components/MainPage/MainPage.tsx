import { Container, Grid, Typography, Zoom } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CountryCard from 'Components/CountryCard';
import type { Countries } from 'Entities/country';
import * as React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      flexBasis: 'auto',
      flexGrow: 1,
      flexShrink: 0,
      maxWidth: theme.spacing(128),
      padding: theme.spacing(2, 2),
    },
    card: {
      maxWidth: 460,
    },
  })
);

interface Props {
  allCountries: Countries;
  isLoading: boolean;
}

const MainPage = ({ allCountries, isLoading }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Container className={classes.main} component="main" maxWidth="sm">
      <div className="container-fluid lg-p-top">
        <Typography align="center" className="lg-mg-bottom" component="h2" variant="h3">
          Countries
        </Typography>
        <div className="container-fluid">
          <Grid container spacing={3}>
            {allCountries.slice(0, 8).map((country) => (
              <Grid key={country.name} item md={4} xs={6}>
                <Zoom in={isLoading}>
                  <CountryCard country={country} />
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </Container>
  );
};

export default MainPage;
