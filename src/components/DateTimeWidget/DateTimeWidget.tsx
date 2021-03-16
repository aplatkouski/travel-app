import { Box, Grid, Typography } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Loader from 'Components/Loader';
import pin from 'Images/pin.svg';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  error: Error | undefined;
  isLoading: boolean;
  language: string;
  timeZone: string;
}

const DateTimeWidget = (props: Props): JSX.Element => {
  const { classes, timeZone, language, isLoading, error } = props;
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const timerId: number = window.setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const dateOptions: Intl.DateTimeFormatOptions = useMemo(
    () => ({
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone,
    }),
    [timeZone]
  );

  const weekdayOptions: Intl.DateTimeFormatOptions = useMemo(
    () => ({
      weekday: 'long',
      timeZone,
    }),
    [timeZone]
  );

  const timeOptions: Intl.DateTimeFormatOptions = useMemo(
    () => ({
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone,
    }),
    [timeZone]
  );

  const dateStr = date.toLocaleString(language, dateOptions);
  const weekdayStr = date.toLocaleString(language, weekdayOptions);
  const timeStr = date.toLocaleString(language, timeOptions);

  if (error) {
    return (
      <Box className={classes.root}>
        <Typography component="p" variant="body2">
          No data
        </Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box className={classes.root}>
        <Loader />
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <img src={pin} alt="pin" className={classes.pin} />
      <Typography component="p" variant="body2" className={classes.typography}>
        {dateStr}
      </Typography>
      <Typography component="p" variant="body2" className={classes.typography}>
        {weekdayStr}
      </Typography>
      <Typography component="p" variant="body2" className={classes.typography}>
        {timeStr}
      </Typography>
    </Box>
  );
};

export default withStyles(styles, { withTheme: true })(DateTimeWidget);
