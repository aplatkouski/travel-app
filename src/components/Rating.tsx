import React, { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core';

const SightRating = (): JSX.Element => {
  const classes = useStyles();
  const [value, setValue] = useState<number | null>(2);

  return (
    <div className={classes.ratingContainer}>
        <Typography component="legend">Rate the attraction</Typography>
        <Rating
          value={value}
          // @ts-ignore
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
    </div>
  );
};
const useStyles = makeStyles(() =>
  createStyles({
    ratingContainer: {

    },
  })
);
export default SightRating;
