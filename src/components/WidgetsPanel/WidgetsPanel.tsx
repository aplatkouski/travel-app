import { Divider, Drawer, Hidden, IconButton } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import WidgetsIcon from '@material-ui/icons/Widgets';
import CurrencyWidget from 'Components/CurrencyWidget';
import DateTimeWidget from 'Components/DateTimeWidget';
import WeatherWidget from 'Components/WeatherWidget';
import * as React from 'react';
import { useState } from 'react';
import styles from './styles';

interface IProps extends WithStyles<typeof styles> {
  countryCurrency: string;
}

const WidgetsPanel = (props: IProps): JSX.Element => {
  const { classes, countryCurrency } = props;
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleDrawerToggle = (): void => {
    setMobileOpen((s) => !s);
  };

  const Widgets = (
    <>
      <WeatherWidget />
      <Divider />
      <CurrencyWidget countryCurrency={countryCurrency} />
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
