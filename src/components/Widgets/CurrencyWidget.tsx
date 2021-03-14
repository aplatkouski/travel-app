import { makeStyles } from '@material-ui/core';
import React from 'react';
import { ICurrency } from 'States/widgets/reducer';

interface IProps {
  currency: ICurrency;
  localCurrency: string;
}

const CurrencyWidget = (props: IProps): JSX.Element => {
  const { currency, localCurrency } = props;
  const classes = useStyles();

  return (
    <div className={classes.currencyWidgetContainer}>
      <span>
        1{localCurrency} -{currency?.conversion_rates.USD} USD
      </span>
      <span>
        1{localCurrency} -{currency?.conversion_rates.EUR} EUR
      </span>
      <span>
        1{localCurrency} -{currency?.conversion_rates.RUB} RUB
      </span>
    </div>
  );
};

const useStyles = makeStyles({
  currencyWidgetContainer: {},
});

export default CurrencyWidget;
