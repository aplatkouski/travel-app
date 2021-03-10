import React, { useState, useEffect } from 'react';
import { createStyles, Grid, makeStyles } from '@material-ui/core';

interface IProps {
  images: any[];
  imageIndex: number;
}

const MAX_PANEL_IMAGES = 6;

const PreviewPanel = (props: IProps): JSX.Element => {
  const {images = [], imageIndex = 0} = props;

  const displayImages = images.slice(imageIndex, imageIndex + MAX_PANEL_IMAGES);

  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      {displayImages.map((image, index) => (
        <Grid key={image.description} item className={classNames({
          [classes.image]: true,
          [classes.activeImage]: index === 0
        })}>
          <img src={image.url} alt={image.name} />
        </Grid>
      )}
    </Grid>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    container: {},
    image: {},
    activeImage: {}
  })
);

export default PreviewPanel;
