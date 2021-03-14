import { Card, CardActionArea, CardMedia } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { IUser } from 'Entities/user';
import * as React from 'react';
import * as StateTypes from 'States/types';
import { connect } from 'react-redux';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  currUser: IUser | undefined;
}

const UserCard = ({ classes, currUser }: Props): JSX.Element => {
  const elToRender =
    currUser && currUser.token ? (
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={currUser ? currUser.photoUrl : undefined}
            title={currUser ? currUser.name : ''}
          />
        </CardActionArea>
      </Card>
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
