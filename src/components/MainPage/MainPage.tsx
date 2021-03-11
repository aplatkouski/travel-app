import { Container, Grid, Typography, Zoom } from '@material-ui/core';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import CountryCard from 'Components/CountryCard';
import type { Countries } from 'Entities/country';
import type ID from 'Entities/id';
import * as React from 'react';

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
  });

interface Props extends WithStyles<typeof styles> {
  allCountries: Countries;
  filter: string;
  selectCountry: (id: ID) => void;
}

const MainPage = ({
  allCountries,
  classes,
  filter,
  selectCountry,
}: Props): JSX.Element => (
  <Container className={classes.main} component="main" maxWidth="sm">
    <div className="container-fluid lg-p-top">
      <Typography align="center" className="lg-mg-bottom" component="h2" variant="h3">
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
            .slice(0, 8)
            .map((country) => (
              <Grid key={country.name} item md={4} xs={6}>
                <Zoom in>
                  <CountryCard
                    country={country}
                    onSelect={() => selectCountry(country.id)}
                  />
                </Zoom>
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  </Container>
);

export default withStyles(styles, { withTheme: true })(MainPage);
