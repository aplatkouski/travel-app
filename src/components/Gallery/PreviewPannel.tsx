import React, { useCallback } from 'react';
import { createStyles, Grid, makeStyles } from '@material-ui/core';
import classNames from "classnames";

interface IProps {
  images: any[];
  imageIndex: number;
  onChange: (index: number) => void;
}

const MAX_PANEL_IMAGES = 6;

const PreviewPanel = (props: IProps): JSX.Element => {
  const {images = [], imageIndex = 0, onChange} = props;

  const displayImages = images.slice(imageIndex, imageIndex + MAX_PANEL_IMAGES);

  const handleIndexChange = useCallback((index: number) => () => {
    onChange(imageIndex + index);
  }, [imageIndex, onChange]);

  const classes = useStyles();

  return (
    <Grid container justify="space-evenly" wrap="nowrap" className={classes.container}>
      {displayImages.map((image, index) => (
        <Grid key={image.description} item onClick={handleIndexChange(index)} className={classNames({
          [classes.image]: true,
          [classes.activeImage]: index === 0
        })}>
          <img src={image.url} alt={image.name} />
        </Grid>
      ))}
    </Grid>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      height: '100px',
      overflow: 'hidden',
      marginTop: '0.5rem',
    },
    image: {

      "& img": {
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '5px',
        width: '150px',
        height: '100px',
        objectFit: 'contain',
        "&:hover": {
          boxShadow: 'inset 0px 0px 3px 1px rgb(0 140 186 / 50%)',
        },
      },
    },
    activeImage: {
      border: '2px solid red',
    }
  })
);

export default PreviewPanel;
