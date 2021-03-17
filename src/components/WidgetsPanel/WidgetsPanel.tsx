import { Drawer, Hidden, IconButton } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import WidgetsIcon from '@material-ui/icons/Widgets';
import CurrencyWidget from 'Components/CurrencyWidget';
import DateTimeWidget from 'Components/DateTimeWidget';
import WeatherWidget from 'Components/WeatherWidget';
import * as React from 'react';
import { useState } from 'react';
import styles from './styles';
import img1 from 'Images/6.png';
import img2 from 'Images/2.png';
import img3 from 'Images/3.png';
import img4 from 'Images/4.png';

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
      <img src={img1} className={classes.image}/>
      <DateTimeWidget />
      <img src={img2} className={classes.image}/>
      <WeatherWidget />
      <img src={img3} className={classes.image}/>
      <CurrencyWidget countryCurrency={countryCurrency} />
      <img src={img4} className={classes.image}/>
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
        <Hidden implementation="css" mdUp>
          <Drawer
            ModalProps={{ keepMounted: true }}
            anchor="left"
            classes={{ paper: classes.drawerPaper, root: classes.drawerRoot }}
            onClose={handleDrawerToggle}
            open={mobileOpen}
            variant="temporary"
          >
            {Widgets}
          </Drawer>
        </Hidden>

        <Hidden implementation="css" mdDown>
          <Drawer classes={{ paper: classes.drawerPaper,  root: classes.drawerRoot }} open variant="permanent">
            {Widgets}
          </Drawer>
        </Hidden>
      </aside>
    </>
  );
};

export default withStyles(styles, { withTheme: true })(WidgetsPanel);
