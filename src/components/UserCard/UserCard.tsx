import { Avatar } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { IUser } from 'Entities/user';
import React, { useRef } from 'react';
import * as StateTypes from 'States/types';
import { connect } from 'react-redux';
import userAltImg from 'Assets/images/UnknownUser.png';
import styles from './styles';
import { api, getUserImgAPI } from '../../constants';

interface Props extends WithStyles<typeof styles> {
  currUser: IUser | undefined;
}

const UserCard = ({ classes, currUser }: Props): JSX.Element => {
  const imgRef = useRef<HTMLImageElement | null>(null);

  function handleLoadAlternativeImg() {
    if (imgRef && imgRef.current) {
      imgRef.current.src = userAltImg;
    }
  }

  const elToRender =
    currUser && currUser.token ? (
      <div className={classes.root}>
        <Avatar
          ref={imgRef}
          alt="no user img"
          className={classes.large}
          onError={handleLoadAlternativeImg}
          src={`${api}/${getUserImgAPI}/${currUser.userId}`}
        />
        <p>{currUser.name}</p>
      </div>
    ) : (
      <div />
    );
  return elToRender;
};

const mapStateToProps = (state: StateTypes.RootState) => ({
  currUser: state.user.user,
});

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps)(UserCard)
);
