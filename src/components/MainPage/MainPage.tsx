import { Container, Grid, Typography, Zoom } from '@material-ui/core';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import CountryCard from 'Components/CountryCard';
import type { Countries } from 'Entities/country';
import type { ID } from 'Entities/travel-app';
import * as React from 'react';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

const styles = (theme: Theme) =>
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
    header: {
      color: theme.palette.text.secondary,
      textAlign: 'left',
      fontSize: '3rem',
    },
  });

interface Props extends WithStyles<typeof styles> {
  allCountries: Countries;
  filter: string;
}

const MainPage = ({ allCountries, classes, filter }: Props): JSX.Element => {
  const history = useHistory();

  const handleCountrySelect = useCallback(
    (id: ID) => () => {
      history.push(`/country/${id}`);
    },
    [history]
  );

  return (
    <Container className={classes.main} component="main" maxWidth="sm">
      <div className="container-fluid lg-p-top">
        <Typography align="center" className={classes.header} component="h1" variant="h1">
          Countries
        </Typography>
        <div className="container-fluid">
          <Grid container spacing={3}>
            {allCountries
              .filter(
                (c) =>
                  c.name.toLowerCase().includes(filter) ||
                  c.capital.toLowerCase().includes(filter)
              )
              .map((country) => (
                <Grid key={country.name} item md={4} xs={6}>
                  <Zoom in>
                    <CountryCard
                      country={country}
                      onSelect={handleCountrySelect(country.id)}
                    />
                  </Zoom>
                </Grid>
              ))}
          </Grid>
        </div>
      </div>
    </Container>
  );
};

export default withStyles(styles, { withTheme: true })(MainPage);
