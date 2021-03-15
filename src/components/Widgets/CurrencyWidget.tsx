import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import { ICurrency } from 'States/widgets/reducer';
import usd from 'Assets/icons/usd.png';
import eur from 'Assets/icons/eur.png';
import rub from 'Assets/icons/rub.png';
import currencyLogo from 'Assets/icons/currency.svg';

interface IProps {
  currencies: ICurrency[];
}

const CurrencyWidget = (props: IProps): JSX.Element => {
  const { currencies } = props;
  const classes = useStyles();

  const getClassName = useCallback((currencyBaseCode: string) => {
    if(currencyBaseCode === "USD") {
      return usd;
    } else if(currencyBaseCode === "EUR") {
      return eur;
    } else if(currencyBaseCode === "RUB") {
      return rub;
    }
  },[]);

  return (
    <Grid container direction="column" justify="space-around"
          className={classes.currencyWidgetContainer}>
      <Grid container>
        <img src={currencyLogo} alt="currency widget logo" className={classes.widgetHeaderImg} />
        <Typography className={classes.widgetHeader} variant="h2">
          Currencies
        </Typography>
      </Grid>
      {currencies?.map((currency) => (
          <Grid container className={classes.widgetCurrency}
                key={`${currency.time_last_update_unix}-${currency.time_next_update_unix}`}
                justify="space-between">
            <div>
              <span className={classes.number}>1</span>
              <img src={getClassName(currency.base_code)} alt="flag" className={classes.flag} />
              {currency.base_code}</div>
            <div><span className={classes.number}>{currency.conversion_rate}</span>{currency.target_code}</div>
          </Grid>
        ))}
    </Grid>
  );
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    currencyWidgetContainer: {
      height: theme.spacing(22),
      width: theme.spacing(25),

      fontSize: '1.1rem',
      padding: theme.spacing(1.25),
      background: theme.palette.background.paper,
      boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),' +
        ' 0px 1px 3px 0px rgb(0 0 0 / 12%)',
      borderRadius: '5px',
    },
    widgetHeader: {
      fontSize: '1.5rem',
      alignSelf: 'flex-end',
      color: theme.palette.text.secondary,
      fontFamily: 'Vollkorn SC',
    },
    widgetHeaderImg: {
      width: '100%',
      maxWidth: '20%',
    },
    widgetCurrency: {
      fontFamily: 'serif',
      borderBottom: '1px solid #f7f7f7',
      color: theme.palette.text.secondary,
    },
    number: {
      fontFamily: 'monospace',
      marginRight: theme.spacing(0.5),
    },
    flag: {
      maxWidth: theme.spacing(2.5),
      width: '100%',
      marginRight: theme.spacing(0.5),
    },
  }));

export default CurrencyWidget;
