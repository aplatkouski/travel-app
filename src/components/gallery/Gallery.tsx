import ImagesSlider from 'Components/gallery/ImageSlider';
import PreviewPanel from 'Components/gallery/PreviewPannel';
import React, { useState, useEffect, useCallback } from 'react';
import { createStyles, makeStyles } from '@material-ui/core';

const Gallery = (): JSX.Element => {
  const [images, setImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        setImages(response?.data.memes);
      });
  }, []);

  const handleImageIndexChange = useCallback((index: number) => {
    setImageIndex(index);
  }, []);

  return (
    <div className={classes.container}>
      <ImagesSlider images={images} imageIndex={imageIndex} onChange={handleImageIndexChange} />
      <PreviewPanel images={images} imageIndex={imageIndex} />
    </div>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    container: {},
  })
);

export default Gallery;
