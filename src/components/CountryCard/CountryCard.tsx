import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { ICountryPreview } from 'Entities/country';
import * as React from 'react';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  country: ICountryPreview;
  onSelect: () => void;
}

const CountryCard = ({ classes, country, onSelect }: Props): JSX.Element => (
  <Card className={classes.root}>
    <CardActionArea onClick={() => onSelect()}>
      <CardMedia
        className={classes.media}
        image={country.photoUrl}
        title={country.name}
      />
      <CardContent>
        <Typography component="h3" gutterBottom variant="h5">
          {country.name}
        </Typography>
        <Typography className={classes.capital} component="p" variant="body2">
          {country.capital}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default withStyles(styles, { withTheme: true })(CountryCard);
