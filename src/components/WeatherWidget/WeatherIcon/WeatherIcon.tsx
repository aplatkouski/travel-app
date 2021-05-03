import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';
import getWeatherIcon from './get-weather-icon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: theme.spacing(6),
      width: 'auto',
    },
  })
);

export interface Props {
  iconId: string;
}

const WeatherIcon = ({ iconId }: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <img
      alt="weather icon"
      className={classes.root}
      src={getWeatherIcon(iconId)}
      title="weather"
    />
  );
};

export default WeatherIcon;
