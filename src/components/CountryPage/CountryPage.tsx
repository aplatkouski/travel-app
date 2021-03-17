import { Container, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import CountryMap from 'Components/CountryMap';
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
  country: ICountry;
  language: Language;
  isLoading: boolean;
}

interface IDispatch {
  getCountyInfo: (id: ID) => void;
}

interface ParamTypes {
  id: ID;
}

type IProps = IRedux & IDispatch;

const CountryPageContainer = (props: IProps): JSX.Element => {
  const { country, getCountyInfo, language, isLoading } = props;
  const classes = useStyles();
  const { id } = useParams<ParamTypes>();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 150);
  }, []);

  useEffect(() => {
    getCountyInfo(id);
  }, [getCountyInfo, id, language]);

  return country && !isLoading ? (
    <Container className={classes.main} component="main">
      <Grid alignItems="center" container direction="column">
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
            <Typography className={classes.countryName} variant="h1">
              {country.name}
            </Typography>
            <Typography className={classes.countryCapital} variant="h2">
              {country.capital}
            </Typography>
          </Grid>
        </Grid>

        <Grid alignItems="center" container justify="center">
          <Grid item sm={6}>
            <CountryMap />
          </Grid>
        </Grid>

        <Gallery sights={country.sights} />

        <Typography className={classes.countryDescription} variant="h3">
          <FormatQuoteIcon color="secondary" fontSize="large" />
          {country.description}
        </Typography>

        <ReactPlayer controls light pip url={country.videoUrl} />
      </Grid>
      <WidgetsPanel countryCurrency={country.currency} />
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
    countryDescription: {
      fontSize: '2rem',
      color: theme.palette.text.secondary,
      padding: theme.spacing(0, 4),
      margin: theme.spacing(10, 0),
      background: '#FDFBFB',
      letterSpacing: '.05em',
      lineHeight: 1.4,
      borderLeft: '10px solid #00add7',
      fontStyle: 'italic',
      fontFamily: 'Vollkorn SC',
    },
  })
);

const mapStateToProps = (state: RootState) => ({
  country: state.country.payload,
  isLoading: state.country.isLoading,
  language: state.languageSelector.language,
});

const mapDispatchToProps = {
  getCountyInfo: getCountryThunk,
};

const CountryPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CountryPageContainer as any);
export default CountryPage;
