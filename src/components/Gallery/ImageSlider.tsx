import SightRating from 'Components/Rating';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import FullscreenIcon from '@material-ui/icons/Fullscreen';

interface IProps {
  images: any[];
  imageIndex: number;
  onChange: (index: number) => void;
}

const ImagesSlider = (props: IProps): JSX.Element => {
  const {images = [], imageIndex = 0, onChange} = props;
  const [fullScreenEnabled, setFullScreenEnabled] = useState(false);

  const totalImages = useMemo(() => images.length, [images]);

  const classes = useStyles();

  const handleNavBtnClick = useCallback((index: number) => () => {
    onChange(index);
  }, [onChange]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    if (e.key === "ArrowLeft") {
      handleNavBtnClick(imageIndex-1)();
    }
    if (e.key === "ArrowRight") {
      handleNavBtnClick(imageIndex+1)();
    }
  }, [handleNavBtnClick,imageIndex]);

  const handleFullScreen = useCallback(() => {
    if (fullScreenEnabled) {
      document.exitFullscreen();
    } else {
      document.querySelector('#imageSliderContainer')?.requestFullscreen();
    }
    setFullScreenEnabled(!fullScreenEnabled);
  }, [fullScreenEnabled]);

  useEffect(() => {
    document.addEventListener("keyup", handleKeyPress);
    return () => {
      document.removeEventListener("keyup", handleKeyPress);
    }
  }, [handleKeyPress]);

  return (
    <div className={classes.container} id="imageSliderContainer">
      <button onClick={handleFullScreen}
              className={classes.button}>
        <FullscreenIcon/>
      </button>

      <h2>{images[imageIndex]?.name}</h2>
      <div className={classes.stage}>
        <img
          src={images[imageIndex]?.url}
          alt={`${images[imageIndex]?.name}`}
        />
      </div>
      <div className={classes.buttonContainer}>
        <button onClick={handleNavBtnClick(imageIndex - 1)}
                disabled={imageIndex === 0}
                className={classes.button}>
          <ArrowBackIosIcon/>
        </button>
        <button
          onClick={handleNavBtnClick(imageIndex + 1)}
          disabled={imageIndex + 1 === totalImages}
          className={classes.button}
        >
          <ArrowForwardIosIcon/>
        </button>
      </div>
        <SightRating/>
        <div className={classes.counter}>
          {totalImages && `Displaying ${imageIndex + 1} of ${totalImages}`}
        </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      border: '5px solid #c6dcf7',
      borderRadius: '5px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      position: 'relative',
      justifyContent: 'center',
      background: theme.palette.background.default,
    },
    buttonContainer: {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
    },
    button: {
      color: 'red',
      background: 'transparent',

      "&:disabled": {
        background: '#ddd',
        color: 'rgb(83, 80, 80)',
      }
    },
    counter: {
      padding: '20px',
    },
    stage: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '440px',
      "& img": {
        display: 'block',
        position: 'relative',
        opacity: 1,
        maxHeight: '90%',
        maxWidth: '100%',
        transition: 'opacity 0.2s ease-in-out',
        padding: '20px',
      },
    },
  })
);

export default ImagesSlider;
