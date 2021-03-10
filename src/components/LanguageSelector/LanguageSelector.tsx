import { FormControl, MenuItem, Select } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Language } from 'Entities/travel-app';
import * as React from 'react';
import { useCallback } from 'react';
import * as StateTypes from 'States/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: '3rem',
      background: 'transparent',
    },
    select: {
      '&:before': {
        border: 'none',
      },
      '&:after': {
        borderColor: theme.palette.primary.main,
      },
      '&:hover:not(.Mui-disabled):before': {
        border: 'none',
      },
    },
    icon: {
      fill: theme.palette.primary.main,
    },
  })
);

interface Props {
  currentLanguage: Language;
  onSelect: (value: Language) => StateTypes.IAction<Language>;
}

const LanguageSelector = ({
  currentLanguage,
  onSelect: handleSelect,
}: Props): JSX.Element => {
  const classes = useStyles();

  const handleChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<{ name?: string; value: unknown }>) => {
      if (typeof value === 'string') handleSelect(value as Language);
    },
    [handleSelect]
  );

  return (
    <FormControl className={classes.formControl}>
      <Select
        className={classes.select}
        inputProps={{
          classes: {
            icon: classes.icon,
          },
        }}
        onChange={handleChange}
        value={currentLanguage}
      >
        {['en', 'ru', 'de'].map((language) => (
          <MenuItem key={language} value={language}>
            {language}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
