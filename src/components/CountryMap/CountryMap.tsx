import { Box, Typography } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Loader from 'Components/Loader';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { latLngBounds, LatLngExpression } from 'leaflet';
import React from 'react';
import { MAP_API_URL } from '../../constants';
import 'leaflet/dist/leaflet.css';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  error: Error | undefined;
  isLoading: boolean;
  // language: string;
  lat: number | undefined;
  lng: number | undefined;
}

const CountryMap = (props: Props): JSX.Element => {
  const { classes, lat, lng, isLoading, error } = props;

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

  const position: LatLngExpression = [lat, lng];

  return (
    <MapContainer
      attributionControl={false}
      center={position}
      className={classes.root}
      maxBounds={latLngBounds([-90, -180], [90, 180])}
      maxBoundsViscosity={1.0}
      maxZoom={12}
      minZoom={1}
      worldCopyJump
      zoom={8}
      zoomControl={false}
    >
      <TileLayer url={MAP_API_URL} />

      <Marker position={position}>
        <Popup>Capital</Popup>
      </Marker>
    </MapContainer>
  );
};

export default withStyles(styles, { withTheme: true })(CountryMap);
