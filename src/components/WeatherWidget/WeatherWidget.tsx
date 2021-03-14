import { Typography, Box } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import IWeather from 'Entities/weather';
import React, { useEffect } from 'react';
import Loader from 'Components/Loader';
import { ArrowIcon } from './ArrowIcon/ArrowIcon';
import WeatherIcon from './WeatherIcon';
import { dictionary as d } from './constants';
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

const DELAY = 60000;

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
    const update = () => {
      if (lat && lng) {
        getWeather(lat, lng, language);
      }
    };

    update();
    const timerId: number = window.setInterval(() => update(), DELAY);
    return () => clearInterval(timerId);
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

  const iconStyles = weather.windDeg
    ? {
        transform: `rotate(${weather.windDeg + 90}deg)`,
        color: 'blue',
      }
    : undefined;

  return (
    <Box className={classes.root}>
      {weather.icon && <WeatherIcon iconId={weather.icon} />}

      {String(weather.temperature) && (
        <Typography component="p" variant="body2">
          {`${d[language].temperature}: ${weather.temperature.toFixed()}`}
        </Typography>
      )}

      {String(weather.humidity) && (
        <Typography component="p" variant="body2">
          {`${d[language].humidity}: ${weather.humidity}`}
        </Typography>
      )}

      {String(weather.windSpeed) && (
        <Typography component="p" variant="body2">
          {`${d[language].wind}: ${weather.windSpeed.toFixed(1)}`}
          &nbsp;
          {String(weather.windDeg) && <ArrowIcon styles={iconStyles} />}
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
