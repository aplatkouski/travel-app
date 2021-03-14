import { createStyles, Grid, makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { MAX_PANEL_IMAGES } from '../../constants';
import { IPanelSight } from './model';

interface IGetStartProps {
  currentIndex: number;
  total: number;
  maxCountPerPage: number;
}

const getStartIndex = ({
  currentIndex,
  total,
  maxCountPerPage,
}: IGetStartProps): number => {
  if (maxCountPerPage < 1) return 0;
  const endIndex =
    currentIndex + maxCountPerPage > total ? total : currentIndex + maxCountPerPage;
  return endIndex - maxCountPerPage < 0 ? 0 : endIndex - maxCountPerPage;
};

interface IProps {
  currentSightIndex: number;
  onChange: (index: number) => void;
  sights: IPanelSight[];
  totalImages: number;
}

const PreviewPanel = (props: IProps): JSX.Element => {
  const { currentSightIndex, onChange, sights = [], totalImages = 0 } = props;
  const [startIndex, setStartIndex] = useState<number>(0);

  useEffect(() => {
    setStartIndex(
      getStartIndex({
        currentIndex: currentSightIndex,
        total: totalImages,
        maxCountPerPage: MAX_PANEL_IMAGES,
      })
    );
  }, [currentSightIndex, totalImages]);

  const handleIndexChange = useCallback((index: number) => () => {
    onChange(index);
  }, [onChange]);

  const classes = useStyles();

  return (
    <Grid className={classes.container} container justify="space-evenly" wrap="nowrap">
      {sights
        .slice(startIndex, startIndex + MAX_PANEL_IMAGES)
        .map((sight: IPanelSight) => (
          <Grid
            key={sight.id}
            className={classNames({
              [classes.image]: true,
              [classes.activeImage]: currentSightIndex === sight.index,
            })}
            item
            onClick={handleIndexChange(sight.index)}
          >
            <img alt={sight.name} src={sight.photoUrl} />
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
      marginTop: '.5rem',
    },
    image: {
      cursor: 'pointer',
      "& img": {
        height: '99px',
        objectFit: 'cover',
        borderRadius: '5px',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px' +
          ' 1px 3px 0px rgb(0 0 0 / 12%)',
        "&:hover": {
          boxShadow: '0px 0px 9px 1px #717171',
        },
      },
    },
    activeImage: {
      "& img": {
        border: '2px solid #00add7',
      }
    }
  })
);

export default PreviewPanel;
