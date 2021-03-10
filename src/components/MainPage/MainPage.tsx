import { Container, Grid, Typography, Zoom } from '@material-ui/core';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import CountryCard from 'Components/CountryCard';
import { Countries } from 'Entities/country';
import { useCallback } from 'react';
import * as React from 'react';
import { useHistory } from "react-router-dom";

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
}

const MainPage = (props: Props): JSX.Element => {

  const { allCountries, classes, filter } = props;
  const history = useHistory();

  const handleCountrySelect = useCallback((id: string) => () => {
    history.push(`/country/${id}`);
  }, [history]);

  return (
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
                    onSelect={handleCountrySelect(country.id)}
                  />
                </Zoom>
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  </Container>
)
};

export default withStyles(styles, { withTheme: true })(MainPage);
