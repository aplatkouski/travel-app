import { Drawer, Hidden, IconButton } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import WidgetsIcon from '@material-ui/icons/Widgets';
import CurrencyWidget from 'Components/CurrencyWidget';
import DateTimeWidget from 'Components/DateTimeWidget';
import WeatherWidget from 'Components/WeatherWidget';
import beachImg from 'Images/beach.png';
import crabImg1 from 'Images/crab-1.png';
import crabImg2 from 'Images/crab-2.png';
import smurfImg from 'Images/smurf.png';
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
      <img alt="smurf" className={classes.image} src={smurfImg} />
      <DateTimeWidget />
      <img alt="crab" className={classes.image} src={crabImg1} />
      <WeatherWidget />
      <img alt="beach" className={classes.image} src={beachImg} />
      <CurrencyWidget countryCurrency={countryCurrency} />
      <img alt="crab" className={classes.image} src={crabImg2} />
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
          <Drawer
            classes={{ paper: classes.drawerPaper, root: classes.drawerRoot }}
            open
            variant="permanent"
          >
            {Widgets}
          </Drawer>
        </Hidden>
      </aside>
    </>
  );
};

export default withStyles(styles, { withTheme: true })(WidgetsPanel);
