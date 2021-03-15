import { Divider, Drawer, Hidden, IconButton } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import WidgetsIcon from '@material-ui/icons/Widgets';
import DateTimeWidget from 'Components/DateTimeWidget';
import WeatherWidget from 'Components/WeatherWidget';
import * as React from 'react';
import { useState } from 'react';
import styles from './styles';

const WidgetsPanel = ({ classes }: WithStyles): JSX.Element => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleDrawerToggle = (): void => {
    setMobileOpen((s) => !s);
  };

  const Widgets = (
    <>
      <WeatherWidget />
      <Divider />
      курс валют
      <Divider />
      <DateTimeWidget />
    </>
  );

  return (
    <>
      <IconButton
        aria-label="open widgets panel"
        className={classes.menuButton}
        color="inherit"
        edge="start"
        onClick={handleDrawerToggle}
      >
        <WidgetsIcon />
      </IconButton>

      <aside aria-label="widgets" className={classes.drawer}>
        <Hidden implementation="css" smUp>
          <Drawer
            ModalProps={{ keepMounted: true }}
            anchor="right"
            classes={{ paper: classes.drawerPaper }}
            onClose={handleDrawerToggle}
            open={mobileOpen}
            variant="temporary"
          >
            {Widgets}
          </Drawer>
        </Hidden>

        <Hidden implementation="css" smDown>
          <Drawer classes={{ paper: classes.drawerPaper }} open variant="permanent">
            {Widgets}
          </Drawer>
        </Hidden>
      </aside>
    </>
  );
};

export default withStyles(styles, { withTheme: true })(WidgetsPanel);
