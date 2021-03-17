import { Button, InputBase, Paper, Tooltip, Zoom } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import { Language } from 'Entities/travel-app';
import * as React from 'react';
import { useRef } from 'react';
import * as StateTypes from 'States/types';
import getDictionary from './i18n/translate';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  currentLanguage: Language;
  onChange: (value: string) => StateTypes.IAction<string>;
  value: string;
}

const SearchField = (props: Props): JSX.Element => {
  const {
    classes,
    currentLanguage,
    onChange: handleChange,
    value,
  } = props;

  const inputEl = useRef<HTMLInputElement>(null);
  const d = getDictionary(currentLanguage);

  const handleButtonClick = () => {
    if (inputEl && inputEl.current) {
      handleChange(inputEl.current.value);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.key.toLowerCase() === 'enter' && inputEl && inputEl.current) {
      event.preventDefault();
      handleChange(inputEl.current.value);
    }
  };

  return (
    <Paper className={classes.root} component="form">
      <Tooltip
        TransitionComponent={Zoom}
        arrow
        placement="bottom-end"
        title={d.inputTooltip}
      >
        <InputBase
          autoFocus
          className={classes.input}
          inputProps={{ 'aria-label': 'search country' }}
          inputRef={inputEl}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={d.searchCountry}
          type="search"
          value={value}
        />
      </Tooltip>
      <Button
        color="primary"
        component="span"
        onClick={handleButtonClick}
        startIcon={<Search />}
        variant="contained"
      >
        {d.search}
      </Button>
    </Paper>
  );
};

export default withStyles(styles, { withTheme: true })(SearchField);
