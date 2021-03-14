import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';
import getWeatherIcon from './getWeatherIcon';

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

  const src = getWeatherIcon(iconId);
  return <img alt="weather icon" className={classes.root} src={src} title="weather" />;
};

export default WeatherIcon;
