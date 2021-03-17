import { Box, Typography } from '@material-ui/core';
import { useTheme, withStyles, WithStyles } from '@material-ui/core/styles';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import Loader from 'Components/Loader';
import { Language, Languages } from 'Entities/travel-app';
import { latLngBounds, LatLngExpression } from 'leaflet';
import React, { useMemo, useRef } from 'react';
import { GeoJSON, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import {
  FLAG_API_URL,
  MAP_API_URL_DE,
  MAP_API_URL_EN,
  MAP_API_URL_RU,
} from '../../constants';
import { countryFeatureCollection, IGeoJSON } from './country-feature-collection';
import styles from './styles';
import screenModeChange from './utils/screen-mode-change';

export type IMapURLs = {
  [key in keyof Languages]: string;
};

const URLs: IMapURLs = {
  de: MAP_API_URL_DE,
  en: MAP_API_URL_EN,
  ru: MAP_API_URL_RU,
};

interface Props extends WithStyles<typeof styles> {
  capital: string | undefined;
  code: string | undefined;
  error: Error | undefined;
  isLoading: boolean;
  language: Language;
  lat: number | undefined;
  lng: number | undefined;
}

const CountryMap = (props: Props): JSX.Element => {
  const { capital, classes, code, error, isLoading, language, lat, lng } = props;

  const theme = useTheme();

  const containerRef = useRef<HTMLDivElement | null>(null);

  const geoJSON: IGeoJSON | undefined = useMemo(() => {
    return countryFeatureCollection.features.find(
      ({ properties }) => properties.alpha2Code === code
    );
  }, [code]);

  const style = useMemo(
    () => ({
      fillColor: theme.palette.primary.main,
      fillOpacity: 0.2,
      color: 'transparent',
    }),
    [theme]
  );

  const handleFullScreen = (): void => {
    if (containerRef.current) {
      screenModeChange(containerRef.current);
    }
  };

  if (error || !lat || !lng) {
    return (
      <Box className={classes.root}>
        <Typography component="p" variant="body2">
          No data
        </Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box className={classes.root}>
        <Loader />
      </Box>
    );
  }

  const popup = geoJSON ? (
    <Popup>
      <Box>
        {geoJSON && (
          <img
            alt="flag"
            className={classes.flag}
            src={`${FLAG_API_URL}${geoJSON.id.toLowerCase()}.svg`}
          />
        )}
        <Typography component="p" variant="h6">
          {capital}
        </Typography>
      </Box>
    </Popup>
  ) : null;

  const position: LatLngExpression = [lat, lng];

  return (
    <div ref={containerRef} className={classes.root}>
      <button className={classes.fullScreenBtn} onClick={handleFullScreen} type="button">
        <FullscreenIcon color="primary" />
      </button>

      <MapContainer
        attributionControl={false}
        center={position}
        className={classes.map}
        maxBounds={latLngBounds([-90, -180], [90, 180])}
        maxBoundsViscosity={1.0}
        worldCopyJump
        zoom={4}
        zoomControl={false}
      >
        <TileLayer url={URLs[language]} />

        {geoJSON && <GeoJSON data={geoJSON} style={style} />}

        <Marker position={position}>{popup}</Marker>
      </MapContainer>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(CountryMap);
