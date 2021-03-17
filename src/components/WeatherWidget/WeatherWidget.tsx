import { Box, Grid, Typography } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Loader from 'Components/Loader';
import { Language } from 'Entities/travel-app';
import IWeather from 'Entities/weather';
import pin from 'Images/pin.svg';
import React, { useEffect } from 'react';
import { WEATHER_DATA_UPDATE_MS } from '../../constants';
import ArrowIcon from './ArrowIcon';
import { dictionary } from './constants';
import styles from './styles';
import WeatherIcon from './WeatherIcon';

interface Props extends WithStyles<typeof styles> {
  error: Error | undefined;
  getWeather: () => void;
  isCountryLoading: boolean;
  isWeatherLoading: boolean;
  language: Language;
  lat: number | undefined;
  lng: number | undefined;
  weather: IWeather | undefined;
  weatherError: Error | undefined;
}

const WeatherWidget = ({
  classes,
  lat,
  lng,
  language,
  isCountryLoading,
  error,
  isWeatherLoading,
  weatherError,
  weather,
  getWeather,
}: Props): JSX.Element => {
  useEffect(() => {
    getWeather();
    const timerId: number = window.setInterval(getWeather, WEATHER_DATA_UPDATE_MS);
    return () => clearInterval(timerId);
  }, [lat, lng, language, getWeather]);

  const d = dictionary[language];

  if (error || weatherError || !weather) {
    return (
      <Box className={classes.root}>
        <Typography component="p" variant="body2">
          No data
        </Typography>
      </Box>
    );
  }

  const iconStyles = weather.windDeg
    ? {
        transform: `rotate(${weather.windDeg + 90}deg)`,
      }
    : undefined;

  return (
    <Box className={classes.root}>
      {(isCountryLoading || isWeatherLoading) ? <Loader
        classes={{ loaderContainer: classes.loader }}/> : (
        <>
          <img src={pin} alt="pin" className={classes.pin}/>
      <img alt="pin" className={classes.pin} src={pin} />

          <Grid container>
            {weather.icon && <WeatherIcon iconId={weather.icon}/>}
            <Typography className={classes.widgetHeader} variant="h2">
              {d.weather}
            </Typography>
          </Grid>

          {String(weather.temperature) && (
            <Typography className={classes.weather} component="p" variant="body2">
              {`${d.temperature}: ${weather.temperature.toFixed()}`}
            </Typography>
          )}

          {String(weather.humidity) && (
            <Typography className={classes.weather} component="p" variant="body2">
              {`${d.humidity}: ${weather.humidity}`}
            </Typography>
          )}

          {String(weather.windSpeed) && (
            <Typography className={classes.weather} component="p" variant="body2">
              {`${d.wind}: ${weather.windSpeed.toFixed(1)}`}
              &nbsp;
              {String(weather.windDeg) && <ArrowIcon iconStyles={iconStyles}/>}
            </Typography>
          )}

          {String(weather.description) && (
            <Typography className={classes.weather} component="p" variant="body2">
              {weather.description}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default withStyles(styles, { withTheme: true })(WeatherWidget);
