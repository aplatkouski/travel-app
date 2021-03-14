import { Typography, Box } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import React, { useState, useEffect, useMemo } from 'react';
import Loader from 'Components/Loader';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  timezone: string | undefined;
  language: string;
  isLoading: boolean;
  error: Error | undefined;
}

const DateTimeWidget = ({
  classes,
  timezone,
  language,
  isLoading,
  error,
}: Props): JSX.Element => {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const timerId: number = window.setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const dateOptions: Intl.DateTimeFormatOptions = useMemo(() => {
    return {
      timeZone: timezone,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
  }, [timezone]);

  const weekdayOptions: Intl.DateTimeFormatOptions = useMemo(() => {
    return {
      timeZone: timezone,
      weekday: 'long',
    };
  }, [timezone]);

  const timeOptions: Intl.DateTimeFormatOptions = useMemo(() => {
    return {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
  }, [timezone]);

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
      <Typography component="p" variant="body2">
        {dateStr}
      </Typography>
      <Typography component="p" variant="body2">
        {weekdayStr}
      </Typography>
      <Typography component="p" variant="body2">
        {timeStr}
      </Typography>
    </Box>
  );
};

export default withStyles(styles, { withTheme: true })(DateTimeWidget);
