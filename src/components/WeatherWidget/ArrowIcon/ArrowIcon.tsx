import React, { CSSProperties } from 'react';

import './ArrowIcon.scss';

interface IProps {
  styles: CSSProperties | undefined;
}

export const ArrowIcon = ({ styles }: IProps): JSX.Element => {
  return (
    <span className="icon-container" style={styles}>
      <span className="icon-item" />
    </span>
  );
};
