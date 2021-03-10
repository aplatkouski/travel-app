import { createStyles, makeStyles, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { IRating } from 'Entities/country';
import React, { useState } from 'react';

interface IProps {
  name: string;
  reviews: Array<IRating>;
}

const SightRating = ({ name, reviews }: IProps): JSX.Element => {
  const classes = useStyles();
  const [, setValue] = useState<number | null>(2);

  return (
    <div className={classes.ratingContainer}>
      <Typography component="legend">Rate the attraction</Typography>
      <Rating
        name={name}
        onChange={(_, newValue) => {
          setValue(newValue);
        }}
        value={
          reviews.map((review) => review.rating).reduce((a, c) => a + c, 0) /
          reviews.length
        }
      />
    </div>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    ratingContainer: {},
  })
);

export default SightRating;
