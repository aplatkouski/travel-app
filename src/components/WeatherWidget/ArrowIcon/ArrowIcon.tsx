import { WithStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { CSSProperties } from 'react';
import './ArrowIcon.scss';
import styles from './styles';

interface IProps extends WithStyles<typeof styles> {
  iconStyles: CSSProperties | undefined;
}

const ArrowIcon = ({ classes, iconStyles }: IProps): JSX.Element => {
  return (
    <span className={clsx('icon-container', classes.root)} style={iconStyles}>
      <span className="icon-item" />
    </span>
  );
};

export default withStyles(styles, { withTheme: true })(ArrowIcon);
