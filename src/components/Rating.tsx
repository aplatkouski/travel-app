import { createStyles, makeStyles, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { IRating } from 'Entities/country';
import React, { useCallback, useMemo, useState } from 'react';

interface IProps {
  name: string;
  reviews: Array<IRating>;
}

const SightRating = (props: IProps): JSX.Element => {
  const { name, reviews } = props;
  const classes = useStyles();

  const [, setValue] = useState<number | null>(2);

  const value = useMemo(() => {
    return (
      reviews.map((review) => review.rating).reduce((a, c) => a + c, 0) / reviews.length
    );
  }, [reviews]);

  const handleRatingChange = useCallback((_, newValue) => {
    setValue(newValue);
  }, []);

  return (
    <div className={classes.ratingContainer}>
      <Typography component="legend">Rate the attraction</Typography>
      <Rating name={name} onChange={handleRatingChange} value={value} />
    </div>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    ratingContainer: {},
  })
);

export default SightRating;
