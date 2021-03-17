import { Button, InputBase, Paper, Tooltip, Zoom } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import * as React from 'react';
import { useRef } from 'react';
import * as StateTypes from 'States/types';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  value: string;
  onChange: (value: string) => StateTypes.IAction<string>;
}

const SearchField = ({ classes, value, onChange: handleChange }: Props): JSX.Element => {
  const inputEl = useRef<HTMLInputElement>(null);

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
        title="Enter country or capital."
      >
        <InputBase
          autoFocus
          className={classes.input}
          inputProps={{ 'aria-label': 'search country' }}
          inputRef={inputEl}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search Country"
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
        Search
      </Button>
    </Paper>
  );
};

export default withStyles(styles, { withTheme: true })(SearchField);
