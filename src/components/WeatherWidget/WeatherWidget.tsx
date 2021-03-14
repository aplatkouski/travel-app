import { Typography, Box } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import IWeather from 'Entities/weather';
import React, { useEffect } from 'react';
import Loader from 'Components/Loader';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  lat: number | undefined;
  lng: number | undefined;
  language: string;
  isLoading: boolean;
  error: Error | undefined;
  isWeatherLoading: boolean;
  weatherError: Error | undefined;
  weather: IWeather | undefined;
  getWeather: (lat: number, lng: number, lang: string) => void;
}

const WeatherWidget = ({
  classes,
  lat,
  lng,
  language,
  isLoading,
  error,
  isWeatherLoading,
  weatherError,
  weather,
  getWeather,
}: Props): JSX.Element => {
  useEffect(() => {
    if (lat && lng) {
      getWeather(lat, lng, language);
    }
  }, [lat, lng, language, getWeather]);

  if (error || weatherError || !weather) {
    return (
      <Box className={classes.root}>
        <Typography component="p" variant="body2">
          No data
        </Typography>
      </Box>
    );
  }

  if (isLoading || isWeatherLoading) {
    return (
      <Box className={classes.root}>
        <Loader />
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      {String(weather.temperature) && (
        <Typography component="p" variant="body2">
          {`${weather.temperature} °C`}
        </Typography>
      )}

      {String(weather.description) && (
        <Typography component="p" variant="body2">
          {weather.description}
        </Typography>
      )}
    </Box>
  );
};

export default withStyles(styles, { withTheme: true })(WeatherWidget);
