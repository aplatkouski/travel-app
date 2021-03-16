import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { dictionary } from './constants';
import { Language } from 'Entities/travel-app';
import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'States/types';
import { ICurrency } from 'States/widgets/reducer';
import usd from 'Assets/icons/usd.png';
import eur from 'Assets/icons/eur.png';
import rub from 'Assets/icons/rub.png';
import pin from 'Assets/images/pin.svg';
import currencyLogo from 'Assets/icons/currency.svg';
import { getCurrenciesThunk, IConverter } from 'States/widgets/thunk';

interface IRedux {
  language: Language;
  currencies: ICurrency[];
  isLoading: boolean;
}

interface IDispatch {
  getCurrencies: (converters: IConverter[]) => void;
}

interface ICurrencyWidget {
  countryCurrency: string;
}

type IProps = IRedux & IDispatch & ICurrencyWidget;

const FLAG_MAP: {[key: string]: string} = { "USD": usd, "EUR": eur, "RUB": rub };

const CurrencyWidgetContainer = (props: IProps): JSX.Element => {
  const { language, getCurrencies, currencies, countryCurrency = "" } = props;

  const classes = useStyles();

  const converters = useMemo(() => {
    return [
      {
        localCurrency: countryCurrency,
        toCurrency: 'USD',
      }, {
        localCurrency: countryCurrency,
        toCurrency: 'EUR',
      }, {
        localCurrency: countryCurrency,
        toCurrency: 'RUB',
      },
    ];
  }, [countryCurrency]);

  useEffect(() => {
    getCurrencies(converters);
  }, [getCurrencies, converters, language]);

  const d = dictionary[language];

  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      className={classes.currencyWidgetContainer}
    >
      <img src={pin} alt="pin" className={classes.pin} />
      <Grid container>
        <img src={currencyLogo} alt="currency widget logo" className={classes.widgetHeaderImg}/>
        <Typography className={classes.widgetHeader} variant="h2">
          {d.exchange} {d.rate}
        </Typography>
      </Grid>
      {currencies?.map((currency: ICurrency, index: number) => (
        <Grid
          container
          className={classes.widgetCurrency}
          key={`${currency.time_last_update_unix}/${index}/${currency.conversion_rate}`}
          justify="space-between"
        >
          <div>
            <span className={classes.number}>1</span>
            <img src={FLAG_MAP[currency.base_code]} alt="flag" className={classes.flag}/>
            {currency.base_code}</div>
          <div>
            <span className={classes.number}>{currency.conversion_rate}</span>
            {currency.target_code}
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    currencyWidgetContainer: {
      height: theme.spacing(22),
      width: theme.spacing(28),
      fontSize: '1.1rem',
      padding: theme.spacing(1.25),
      margin: theme.spacing(2,1),
      background: theme.palette.background.default,
      boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),' +
        ' 0px 1px 3px 0px rgb(0 0 0 / 12%)',
      borderRadius: '5px',
      position: 'relative',
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
      borderBottom: '1px solid #ffffff',
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
    pin: {
      maxWidth: theme.spacing(3.5),
      width: '100%',
      position: 'absolute',
      top: theme.spacing(-2),
      right: theme.spacing(-1),
    },
  }));

const mapStateToProps = (state: RootState) => ({
  language: state.languageSelector.language,
  currencies: state.currency.payload || [],
  isLoading: state.currency.isLoading,
});

const mapDispatchToProps = {
  getCurrencies: getCurrenciesThunk,
};

const CurrencyWidget = connect(mapStateToProps, mapDispatchToProps)(CurrencyWidgetContainer);

export default CurrencyWidget;
