import { Container, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Gallery from 'Components/Gallery/Gallery';
import Loader from 'Components/Loader';
import WidgetsPanel from 'Components/WidgetsPanel';
import { ICountry } from 'Entities/country';
import { ID, Language } from 'Entities/travel-app';
import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCountryThunk } from 'States/country/thunk';
import { RootState } from 'States/types';

interface IRedux {
  country: ICountry | undefined;
  language: Language;
}

interface IDispatch {
  getCountyInfo: (id: ID) => void;
}

interface ParamTypes {
  id: ID;
}

type IProps = IRedux & IDispatch;

const CountryPageContainer = (props: IProps): JSX.Element => {
  const { country, getCountyInfo, language } = props;
  const classes = useStyles();
  const { id } = useParams<ParamTypes>();

  useEffect(() => {
    getCountyInfo(id);
  }, [getCountyInfo, id, language]);

  return country ? (
    <Container className={classes.main} component="main">
      <Grid container direction="column">
        <Grid container>
          <Grid className={classes.imgContainer} item sm={4}>
            <img alt={country.name} src={country.photoUrl} />
          </Grid>
          <Grid
            alignItems="center"
            container
            direction="column"
            item
            justify="space-between"
            sm={8}
          >
            <Grid alignItems="center" container direction="column">
              <Typography className={classes.countryName} variant="h1">
                {country.name}
              </Typography>
              <Typography className={classes.countryCapital} variant="h2">
                {country.capital}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid alignItems="center" container justify="center">
          <Grid item sm={6}>
            {country.description}
          </Grid>
          <Grid item sm={6}>
            карта с маркером в столице
          </Grid>
        </Grid>
        <Gallery sights={country.sights} />
        <ReactPlayer controls light pip url={country.videoUrl} />
      </Grid>
      <WidgetsPanel />
    </Container>
  ) : (
    <Loader />
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      position: 'relative',
      display: 'flex',
      flexBasis: 'auto',
      flexGrow: 1,
      flexShrink: 0,
      padding: theme.spacing(2, 0),
      maxWidth: theme.spacing(160),
    },
    imgContainer: {
      '& img': {
        transition: 'all .6s',
      },
      overflow: 'hidden',
    },
    countryName: {
      color: theme.palette.text.secondary,
      fontSize: '4rem',
    },
    countryCapital: {
      fontSize: '3rem',
    },
  })
);

const mapStateToProps = (state: RootState) => ({
  country: state.country.country,
  language: state.languageSelector.language,
});

const mapDispatchToProps = {
  getCountyInfo: getCountryThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryPageContainer);