import { Box, Typography } from '@material-ui/core';
import { useTheme, withStyles, WithStyles } from '@material-ui/core/styles';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import Loader from 'Components/Loader';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import { latLngBounds, LatLngExpression } from 'leaflet';
import React, { useRef, useMemo } from 'react';
import {
  MAP_API_URL_EN,
  MAP_API_URL_RU,
  MAP_API_URL_DE,
  FLAG_API_URL,
} from '../../constants';
import screenModeChange from './utils/screen-mode-change';
import { countryFeatureCollection, IGeoJSON } from './countryFeatureCollection';
import 'leaflet/dist/leaflet.css';
// import './leaflet.scss';
import styles from './styles';

export type IMapURLs = {
  [key: string]: string;
};

const URLs: IMapURLs = {
  en: MAP_API_URL_EN,
  ru: MAP_API_URL_RU,
  de: MAP_API_URL_DE,
};

interface Props extends WithStyles<typeof styles> {
  error: Error | undefined;
  isLoading: boolean;
  language: string;
  lat: number | undefined;
  lng: number | undefined;
  code: string | undefined;
  capital: string | undefined;
}

const CountryMap = (props: Props): JSX.Element => {
  const { classes, language, lat, lng, code, capital, isLoading, error } = props;

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
        <FullscreenIcon color="secondary" />
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
