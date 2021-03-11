import { Container, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Gallery from 'Components/Gallery/Gallery';
import Loader from 'Components/Loader';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dispatch } from 'redux';
import { getCountyInfoThunk } from 'States/country/thunk';

interface IRedux {
  country: any;
}

interface IDispatch {
  getCountyInfo: (id: string, lang: string) => void;
}

type IProps = IRedux & IDispatch;

const CountryPageContainer = (props: IProps): JSX.Element => {
  const { country, getCountyInfo } = props;
  const classes = useStyles();
  // @ts-ignore
  const { id } = useParams();

  useEffect(() => {
    getCountyInfo(id, 'en');
  }, [getCountyInfo, id]);

  return (
    <>
      {(country === undefined) ? <Loader/> : (
        <Container className={classes.main} component="main">
          <Grid container direction="column">

            <Grid container>
              <Grid item sm={4} className={classes.imgContainer}>
                <img
                  src={country.photoUrl}
                />
              </Grid>
              <Grid container item direction="column" justify="space-between" alignItems="center"
                    sm={8}>
                <Grid container direction="column" alignItems="center">
                  <Typography variant="h1" className={classes.countryName}>
                    {country.name}
                  </Typography>
                  <Typography variant="h2" className={classes.countryCapital}>
                    {country.capital}
                  </Typography>
                </Grid>
                <Grid container className={classes.widgetsContainer}>
                  <Grid item sm={4}>погода</Grid>
                  <Grid item sm={4}>курс валют</Grid>
                  <Grid item sm={4}>дата время</Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container justify="center" alignItems="center">
              <Grid item sm={6}>{country.description}</Grid>
              <Grid item sm={6}>карта с маркером в столице</Grid>
            </Grid>
            <Gallery id={id}/>
            <div>video</div>
          </Grid>
        </Container>
      )}
    </>
  );
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      flexBasis: 'auto',
      flexGrow: 1,
      flexShrink: 0,
      padding: theme.spacing(2, 0),
      maxWidth: '1280px',
    },
    imgContainer: {
      "& img": {
        transition: 'all 0.6s',
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
    widgetsContainer: {

    },
  })
);

const mapStateToProps = (state: any) => ({
  country: state.country.payload,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCountyInfo: (id: string, lang: string) =>{
    // @ts-ignore
    dispatch(getCountyInfoThunk(id, lang));
  }
});

const CountryPage = connect(mapStateToProps, mapDispatchToProps)(CountryPageContainer);
export default CountryPage;
