import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import SightRating from 'Components/Rating';
import { ISight } from 'Entities/country';
import React, { useCallback, useEffect, useState } from 'react';
import Grow from '@material-ui/core/Grow';

interface IProps {
  currentSight: ISight;
  currentSightIndex: number;
  onChange: (index: number) => void;
  totalImages: number;
}

const ImagesSlider = (props: IProps): JSX.Element => {
  const { currentSight, currentSightIndex, onChange, totalImages = 0 } = props;
  const [fullScreenEnabled, setFullScreenEnabled] = useState(false);
  const [checked, setChecked] = useState<boolean>(true);

  const classes = useStyles();

  useEffect(() => {
    setTimeout(() => {
      setChecked(true);
    }, 350);
  }, [currentSightIndex]);

  const handleNavBtnClick = useCallback(
    (index: number) => () => {
      onChange(index);
      setChecked(!checked);
    },
    [checked, onChange]
  );

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === 'ArrowLeft' && currentSightIndex) {
        handleNavBtnClick(currentSightIndex - 1)();
      }
      if (e.key === 'ArrowRight' && currentSightIndex + 1 !== totalImages) {
        handleNavBtnClick(currentSightIndex + 1)();
      }
    },
    [handleNavBtnClick, currentSightIndex, totalImages]
  );

  const handleFullScreen = useCallback(() => {
    if (fullScreenEnabled) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      document.exitFullscreen();
    } else {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      document.querySelector('#imageSliderContainer')?.requestFullscreen();
    }
    setFullScreenEnabled(!fullScreenEnabled);
  }, [fullScreenEnabled]);

  useEffect(() => {
    document.addEventListener('keyup', handleKeyPress);
    return () => {
      document.removeEventListener('keyup', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className={classes.container}>
      <Grid alignItems="center" container justify="space-between">
        <div className={classes.counter}>
          {totalImages && `${currentSightIndex + 1}/${totalImages}`}
        </div>
        <button
          className={classes.fullScreenBtn}
          onClick={handleFullScreen}
          type="button"
        >
          <FullscreenIcon color="secondary" fontSize="large"/>
        </button>
      </Grid>
      <Typography className={classes.sightName} variant="h3">
        {currentSight.name}
      </Typography>

      <Grow in={checked}>
        <div className={classes.stage} id="imageSliderContainer">
          <img alt={currentSight.name} src={currentSight.photoUrl} />
          <div className={classes.buttonContainer}>
            <button
              className={classes.button}
              disabled={currentSightIndex === 0}
              onClick={handleNavBtnClick(currentSightIndex - 1)}
              type="button"
            >
              <ArrowBackIosIcon />
            </button>
            <button
              className={classes.button}
              disabled={currentSightIndex + 1 === totalImages}
              onClick={handleNavBtnClick(currentSightIndex + 1)}
              type="button"
            >
              <ArrowForwardIosIcon />
            </button>
          </div>
        </div>
      </Grow>

      <Typography className={classes.sightDescription} variant="h4">
        {currentSight.description}
      </Typography>
      {currentSight.userRating && currentSight.userRating.length ? (
        <SightRating name={currentSight.id} reviews={currentSight.userRating} />
      ) : null}
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      boxShadow: theme.shadows[1],
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: theme.spacing(62.5),
      padding: '10px',

      justifyContent: 'center',
      background: theme.palette.background.paper,
    },
    fullScreenBtn: {
      background: 'transparent',
      transition: 'all .5s ease',
      '&:hover': {
        transform: 'scale(1.3)',
      },
    },
    counter: {
      fontSize: '1.5rem',
      fontFamily: 'Fondamento',
      color: theme.palette.text.secondary,
    },
    buttonContainer: {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'space-between',
      width: '95%',
      alignItems: 'center',
    },
    button: {
      color: theme.palette.secondary.main,
      background: 'transparent',
      transition: 'all .2s ease',
      '&:disabled': {
        color: theme.palette.text.secondary,
      },
      '&:hover': {
        transform: 'scale(1.3)',
        color: '#00add745',
      },
      '&:active': {
        color: theme.palette.secondary.main,
      },
    },
    sightName: {
      color: theme.palette.text.secondary,
      fontSize: '2rem',
      fontFamily: 'Vollkorn SC',
    },
    sightDescription: {
      fontSize: '1.2rem',
      color: theme.palette.text.secondary,
      marginBottom: '1rem',
      fontFamily: 'Vollkorn SC',
      textAlign: 'center',
      lineHeight: '1.5rem',
      minHeight: '130px',
    },
    stage: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: theme.spacing(44),
      position: 'relative',
      '& img': {
        opacity: 1,
        padding: '5px',
        border: '1px solid #ddd',
        maxHeight: '90%',
        maxWidth: '85%',
        transition: 'opacity .2s ease-in-out',
        borderRadius: theme.shape.borderRadius,
        objectFit: 'contain',
      },
    },
  })
);

export default ImagesSlider;
