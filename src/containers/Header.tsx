import React, { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
// @ts-ignore
import logo from '../assets/images/logo.png';
// @ts-ignore
import clouds from '../assets/images/illustration-clouds.png';
// @ts-ignore
import plane from '../assets/images/illustration-plane.png';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

export const LANGUAGE = {
  EN: 'en',
  RU: 'ru',
  DE: 'de',
};

const Header: FC = () => {
  const classes = useStyles();
  const [language, setLanguage] = useState<string>(LANGUAGE.EN);

  const handleChange = useCallback((event: ChangeEvent<{ name?: string; value: unknown }>) => {
    setLanguage((event.target as HTMLSelectElement).value);
  },[]);

  const languageOptions = useMemo(() => {

    return Object.keys(LANGUAGE).map((key) => ({
      // @ts-ignore
      value: LANGUAGE[key],
      label: key,
    }))
  },[]);

	return (
        <Grid container className={classes.header}>

          <div className={classes.exp}>
            <div className={classes.exp1}>
              <img src={clouds} alt="clouds" className={classes.cloudsImg} />
              <img src={logo} className={classes.logo} alt="logo" />
              <img src={plane}  alt="plane" className={classes.planeImg} />
            </div>
          </div>

            <Grid item xs={2}>
              <FormControl className={classes.formControl}>
                <Select
                  value={language}
                  onChange={handleChange}
                  className={classes.select}
                  inputProps={{
                    classes: {
                      icon: classes.icon,
                    },
                  }}
                >
                  {languageOptions.map((language, index) => (
                    <MenuItem value={language.value} key={`${index}-${language.value}`}>
                      {language.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item container direction="column" justify="space-between" xs={10} className={classes.buttonsContainer}>
              <Grid item container justify="flex-end">
                  <Button variant="outlined" color="secondary" className={classes.button}>Sign up</Button>
                  <Button variant="outlined" color="secondary" className={classes.button}>Login</Button>
              </Grid>
              <Grid container justify="flex-end">
                <span>input search</span>
              </Grid>
            </Grid>
        </Grid>
	);
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      boxShadow: '0px 2px 2px -2px #717171',
      height: '7rem',
      padding: '0.5rem 0 0.5rem 1rem',
      background: '#ffffff',
      position: "relative",
    },
    exp: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    exp1: {
      position: "absolute",
      display: "flex",
      width: '73%',
      justifyContent: "space-between",
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'row-reverse',
      },
    },
    cloudsImg: {
      maxWidth: '288px',
      width: "40%",
      [theme.breakpoints.down('xs')]: {
        width: "60%",
      },
      objectFit: 'contain',
    },
    planeImg: {
      maxWidth: '288px',
      width: "40%",
      [theme.breakpoints.down('xs')]: {
        display: "none",
      },
      objectFit: 'contain',
    },
    logo: {
      maxWidth: '110px',
      width: "20%",
      [theme.breakpoints.down('sm')]: {
        width: "60%",
      },
      objectFit: 'contain',
    },
    formControl: {
      minWidth: '3rem',
      background: 'transparent',
    },
    select: {
      "&:before": {
        border: 'none',
      },
      "&:after": {
        borderColor: "#FF385C",
      },
      "&:hover:not(.Mui-disabled):before": {
        border: 'none',
      },
    },
    icon: {
      fill: '#FF385C',
    },
    buttonsContainer: {
      height: '100%',
    },
    button: {
      color: '#FF385C',
      border: '1px solid #FF385C',
      marginRight: '1rem',
    },
  }),
);
export default Header;
