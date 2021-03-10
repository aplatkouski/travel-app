import React, { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { createStyles, makeStyles } from '@material-ui/core';

const SightRating = (): JSX.Element => {
  const classes = useStyles();
  const [value, setValue] = useState<number | null>(2);


  return (
    <div className={classes.ratingContainer}>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Controlled</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          // @ts-ignore
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Box>
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
