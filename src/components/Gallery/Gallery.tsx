import { createStyles, Grid, makeStyles } from '@material-ui/core';
import { ISight } from 'Entities/country';
import React, { useCallback, useMemo, useState } from 'react';
import ImagesSlider from './ImageSlider';
import { IPanelSight } from './model';
import PreviewPanel from './PreviewPannel';

interface IProps {
  sights: Array<ISight>;
}

const Gallery = (props: IProps): JSX.Element => {
  const { sights = [] } = props;
  const [currentSightIndex, setCurrentSightIndex] = useState<number>(0);

  const totalImages = useMemo(() => sights.length, [sights.length]);

  const currentSight = useMemo<ISight | undefined>(() => {
    return sights[currentSightIndex];
  }, [currentSightIndex, sights]);

  const classes = useStyles();

  const panelSights = useMemo<IPanelSight[]>(() => {
    return sights.map((sight: ISight, index) => ({ ...sight, index }));
  }, [sights]);

  const handleCurrentImageChange = useCallback((index: number) => {
    setCurrentSightIndex(index);
  }, []);

  return (
    <Grid alignItems="center" className={classes.container} container direction="column">
      {currentSight ? (
        <ImagesSlider
          currentSight={currentSight}
          currentSightIndex={currentSightIndex}
          onChange={handleCurrentImageChange}
          totalImages={totalImages}
        />
      ) : null}
      {sights.length ? (
        <PreviewPanel
          currentSightIndex={currentSightIndex}
          onChange={handleCurrentImageChange}
          sights={panelSights}
          totalImages={totalImages}
        />
      ) : null}
    </Grid>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    container: {},
  })
);

export default Gallery;
