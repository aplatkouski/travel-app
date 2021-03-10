import { Container, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Gallery from 'Components/Gallery/Gallery';
import React from 'react';


const CountryPage = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Container className={classes.main} component="main">
      <Grid container direction="column">

        <Grid container >
          <Grid item sm={4} className={classes.imgContainer}>
          <img
            src={'https://img2.storyblok.com/1000x1100/filters:format(webp)/f/53624/4096x1260/a8edc3b4b4/pru_4096x1260.png'}
            />
          </Grid>
          <Grid container item direction="column" justify="center" alignItems="center" sm={8}>
            <span>Название страны</span>
            <span>Столица</span>
            <Grid container className={classes.widgetsContainer}>
              <Grid item sm={4}>погода</Grid>
              <Grid item sm={4}>курс валют</Grid>
              <Grid item sm={4}>дата время</Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item sm={6}>инфа о стране</Grid>
          <Grid item sm={6}>карта с маркером в столице</Grid>
        </Grid>
        <Gallery/>
        <div>video</div>
      </Grid>
    </Container>
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
        width: '70vh',
        transition: 'all 0.6s',
      },
      overflow: 'hidden',
    },
    widgetsContainer: {

    },
  })
);
export default CountryPage;
