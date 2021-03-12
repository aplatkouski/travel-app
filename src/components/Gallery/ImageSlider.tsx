import SightRating from 'Components/Rating';
import { ISight } from 'Entities/country';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import Grow from '@material-ui/core/Grow';

interface IProps {
  sights: ISight[];
  sightIndex: number;
  onChange: (index: number) => void;
}

const ImagesSlider = (props: IProps): JSX.Element => {
  const {sights = [], sightIndex = 0, onChange} = props;
  const [fullScreenEnabled, setFullScreenEnabled] = useState(false);
  const [checked, setChecked] = useState<boolean>(true);

  const totalImages = useMemo(() => sights.length, [sights]);

  const classes = useStyles();

  useEffect(() => {
    setTimeout(() => {
      setChecked(true);
    }, 350);
  }, [sightIndex]);


  const handleNavBtnClick = useCallback((index: number) => () => {
    onChange(index);
    setChecked(!checked);
  }, [checked, onChange]);


  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    if (e.key === "ArrowLeft") {
      if(sightIndex !== 0){
        handleNavBtnClick(sightIndex-1)();
      }
    }
    if (e.key === "ArrowRight") {
      if(sightIndex + 1 !== totalImages){
        handleNavBtnClick(sightIndex+1)();
      }
    }
  }, [handleNavBtnClick, sightIndex, totalImages]);

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
    <div className={classes.container}>
      <Grid container justify="space-between" alignItems="center">
        <div className={classes.counter}>
          {totalImages && `${sightIndex + 1}/${totalImages}`}
        </div>
        <button type="button" onClick={handleFullScreen}
                className={classes.fullScreenBtn}>
          <FullscreenIcon color='secondary'/>
        </button>
      </Grid>
      <Typography variant="h3" className={classes.sightName}>
        {sights[sightIndex]?.name}
      </Typography>
      <Grow in={checked}>
        <div className={classes.stage} id="imageSliderContainer">
          <img
            src={sights[sightIndex]?.photoUrl}
            alt={`${sights[sightIndex]?.name}`}
          />
          <div className={classes.buttonContainer}>
            <button
              type="button"
              onClick={handleNavBtnClick(sightIndex - 1)}
              disabled={sightIndex === 0}
              className={classes.button}
            >
              <ArrowBackIosIcon/>
            </button>
            <button
              type="button"
              onClick={handleNavBtnClick(sightIndex + 1)}
              disabled={sightIndex + 1 === totalImages}
              className={classes.button}
            >
              <ArrowForwardIosIcon/>
            </button>
          </div>
        </div>
      </Grow>

      <Typography variant="h4" className={classes.sightDescription}>
        {sights[sightIndex]?.description}
      </Typography>
      <SightRating/>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),' +
        ' 0px 1px 3px 0px rgb(0 0 0 / 12%)',
      borderRadius: '5px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '600px',
      padding: '10px',

      justifyContent: 'center',
      background: theme.palette.background.paper,
    },
    fullScreenBtn: {
      background: 'transparent',
      transition: 'all .5s ease',
      "&:hover": {
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
      "&:disabled": {
        color: theme.palette.text.secondary,
      },
      "&:hover": {
        transform: 'scale(1.3)',
        color: '#00add745',
      },
      "&:active": {
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
      height: '350px',
      position: 'relative',
      "& img": {
        opacity: 1,
        padding: '5px',
        border: '1px solid #ddd',
        maxHeight: '90%',
        maxWidth: '500px',
        transition: 'opacity 0.2s ease-in-out',
        borderRadius: '5px',
        objectFit: 'contain',
      },
    },
  })
);

export default ImagesSlider;
