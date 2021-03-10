import React, { useCallback, useMemo } from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

interface IProps {
  images: any[];
  imageIndex: number;
  onChange: (index: number) => void;
}

const ImagesSlider = (props: IProps): JSX.Element => {
  const {images = [], imageIndex = 0, onChange} = props;

  const totalImages = useMemo(() => images.length, [images]);

  const classes = useStyles();

  const handleNavBtnClick = useCallback((index: number) => () => {
    onChange(index);
  }, []);

  return (
    <div className={classes.container}>
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
        <div className={classes.counter}>
          {totalImages && `Displaying ${imageIndex + 1} of ${totalImages}`}
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      border: '5px solid #c6dcf7',
      borderRadius: '5px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'space-between',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
    },
    buttonContainer: {

    },
    button: {
      background: '#0971f1',
      border: 'none',
      borderRadius: '3px',
      boxShadow: '1px 1px 5px #3f36c4',
      color: '#fff',
      fontSize: '1rem',
      height: '40px',
      width: '130px',
      margin: '20px 10px',
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
