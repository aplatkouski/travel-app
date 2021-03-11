import { IPanelSight } from 'Components/Gallery/Gallery';
import React, { useCallback, useState, useEffect } from 'react';
import { createStyles, Grid, makeStyles } from '@material-ui/core';
import classNames from "classnames";

interface IProps {
  sights: IPanelSight[];
  sightIndex: number;
  onChange: (index: number) => void;
}

const MAX_PANEL_IMAGES = 6;

const PreviewPanel = (props: IProps): JSX.Element => {
  const {sights = [], sightIndex = 0, onChange} = props;
  const [displaySights, setDisplaySights]= useState<IPanelSight[]>([]);

  useEffect(() => {
    let res = sights.slice(sightIndex, sightIndex + MAX_PANEL_IMAGES);
    const existing = displaySights.find(sight => sight.imageIndex === sightIndex);
    if (!displaySights.length || !existing) {
      setDisplaySights(res);
    }
  }, [displaySights, sightIndex, sights]);

  const handleIndexChange = useCallback((sight: IPanelSight) => () => {
    onChange(sight.imageIndex);
  }, [sightIndex, onChange]);

  const classes = useStyles();

  return (
    <Grid container justify="space-evenly" wrap="nowrap" className={classes.container}>
      {displaySights.map((sight: IPanelSight) => (
        <Grid key={`${sight.id}-${sight.name}`} item onClick={handleIndexChange(sight)} className={classNames({
          [classes.image]: true,
          [classes.activeImage]: sightIndex === sight.imageIndex
        })}>
          <img src={sight.photoUrl} alt={sight.name} />
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
      cursor: 'pointer',
      "& img": {
        border: '1px solid theme.palette.text.secondary',
        borderRadius: '5px',
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
