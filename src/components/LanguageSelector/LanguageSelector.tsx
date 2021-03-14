import { FormControl } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Language } from 'Entities/travel-app';
import * as React from 'react';
import { ChangeEvent, useCallback } from 'react';
import * as StateTypes from 'States/types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface Props {
  currentLanguage: Language;
  onSelect: (value: Language) => StateTypes.IAction<Language>;
}
const LanguageSelector = (props: Props): JSX.Element => {
  const { currentLanguage, onSelect: handleSelect } = props;

  const classes = useStyles();

  const handleChange = useCallback(
    ({ target: { value } }: ChangeEvent<{ name?: string; value: unknown }>) => {
      if (typeof value === 'string') {
        handleSelect(value as Language);
      }
    },
    [handleSelect]
  );

  return (
    <FormControl className={classes.formControl}>
      <div className={classes.selectContainer}>
        <select
          className={classes.select}
          onChange={handleChange}
          value={currentLanguage}
        >
          {['en', 'ru', 'de'].map((language) => (
            <option key={language}>{language}</option>
          ))}
        </select>
      </div>
      <ExpandMoreIcon className={classes.icon} />
    </FormControl>
  );
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: '3rem',
      // width: '200px',
      background: 'transparent',
      cursor: 'pointer',
    },
    selectContainer: {
      position: 'relative',
      width: '100%',
    },
    select: {
      color: theme.palette.text.secondary,
      fontFamily: 'Vollkorn SC',
      fontWeight: 600,
      fontSize: '1.2rem',
      padding: '1rem 1.5rem 1rem 1rem',
      appearance: 'none',
      cursor: 'pointer',
      transition: 'all .3s ease',
      lineHeight: 1.5,
      '&:focus': {
        color: theme.palette.text.secondary,
      },
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
    icon: {
      fill: theme.palette.primary.main,
      position: 'absolute',
      top: '15px',
      left: '40px',
      fontSize: '1.5rem',
    },
  })
);
export default LanguageSelector;
