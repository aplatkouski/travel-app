import { Avatar } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import userAltImg from 'Assets/images/UnknownUser.png';
import { IUser } from 'Entities/user';
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import * as StateTypes from 'States/types';
import { api, GET_USER_PHOTO_API } from '../../constants';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  currentUser: IUser | undefined;
}

const UserCard = ({ classes, currentUser }: Props): JSX.Element => {
  const imgRef = useRef<HTMLImageElement | null>(null);

  function handleLoadAlternativeImg() {
    if (imgRef && imgRef.current) {
      imgRef.current.src = userAltImg;
    }
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {currentUser ? (
        <div className={classes.root}>
          <Avatar
            ref={imgRef}
            alt="no user img"
            className={classes.large}
            onError={handleLoadAlternativeImg}
            src={`${api}/${GET_USER_PHOTO_API}/${currentUser.id}`}
          />
          <p>{currentUser.name}</p>
        </div>
      ) : (
        <span />
      )}
    </>
  );
};

const mapStateToProps = (state: StateTypes.RootState) => ({
  currentUser: state.user.current,
});

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps)(UserCard)
);
