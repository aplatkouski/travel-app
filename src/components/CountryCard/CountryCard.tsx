import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  createStyles,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ICountry } from 'Entities/country';
import * as React from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: 460,
    },
    media: {
      height: 230,
    },
  })
);

interface Props {
  country: ICountry;
  onSelect: () => void;
}

const CountryCard = ({ country, onSelect: handleSelect }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => handleSelect()}>
        <CardMedia
          className={classes.media}
          image={country.photoUrl}
          title={country.name}
        />
        <CardContent>
          <Typography component="h3" gutterBottom variant="h5">
            {country.name}
          </Typography>
          <Typography color="textSecondary" component="p" variant="body2">
            {country.capital}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CountryCard;
