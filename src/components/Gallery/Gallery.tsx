import ImagesSlider from 'Components/Gallery/ImageSlider';
import PreviewPanel from 'Components/Gallery/PreviewPannel';
import { ISight } from 'Entities/country';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createStyles, Grid, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getCountyInfoThunk } from 'States/country/thunk';

interface IRedux {
  country: any;
}

interface IGallery {
  id: string;
}

interface IDispatch {
  getCountyInfo: (id: string, lang: string) => void;
}

export interface IPanelSight extends ISight {
  imageIndex: number;
}

type IProps = IRedux & IDispatch & IGallery;

const GalleryContainer = (props: IProps): JSX.Element => {
  const { id, country, getCountyInfo } = props;
  const [sights, setSights] = useState<ISight[]>([]);
  const [sightIndex, setImageIndex] = useState<number>(0);

  const classes = useStyles();

  // useEffect(() => {
  //   fetch("https://api.imgflip.com/get_memes")
  //     .then((response) => response.json())
  //     .then((response) => {
  //       setSights(response?.data.memes);
  //     });
  // }, []);

  useEffect(() => {
    getCountyInfo(id, 'en');
    setSights([...country.sights, ...country.sights])
  }, [getCountyInfo, id]);

  const panelSights = useMemo<IPanelSight[]>(() => {
    return sights.map((sight: ISight, index) => ({ ...(sight), imageIndex: index }));
  }, [sights]);

  const handleImageIndexChange = useCallback((index: number) => {
    setImageIndex(index);
  }, []);

  return (
    <Grid container direction="column" alignItems="center" className={classes.container}>
      <ImagesSlider sights={sights} sightIndex={sightIndex} onChange={handleImageIndexChange} />
      <PreviewPanel sights={panelSights} sightIndex={sightIndex} onChange={handleImageIndexChange} />
    </Grid>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    container: {
    },
  })
);
const mapStateToProps = (state: any) => ({
  country: state.country.payload,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCountyInfo: (id: string, lang: string) =>{
    // @ts-ignore
    dispatch(getCountyInfoThunk(id, lang));
  }
});

const Gallery = connect(mapStateToProps, mapDispatchToProps)(GalleryContainer);

export default Gallery;
