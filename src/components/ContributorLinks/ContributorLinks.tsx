import { Grid, Link } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import GitHubLogo from 'Assets/icons/github-logo.svg';
import SvgImg from 'Components/SvgImg';
import Contributor from 'Entities/contributor';
import * as React from 'react';

export interface Props {
  contributors: Array<Contributor>;
}

const ContributorLinks = ({ contributors }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      {contributors.map((contributor) => (
        <Grid key={contributor.name} className={classes.item} item md={3} sm={6} xs={6}>
          <Link
            className={classes.link}
            href={contributor.gitHubLink}
            rel="noopener"
            target="_blank"
            underline="none"
            variant="body2"
          >
            {contributor.name}
            <SvgImg alt="GitHub logo" src={GitHubLogo} title="github.com" />
          </Link>
        </Grid>
      ))}
    </>
  );
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      color: theme.palette.text.secondary,
      margin: theme.spacing(1, 0),
      minWidth: theme.spacing(20),
      textAlign: 'center',
    },
    link: {
      color: theme.palette.text.secondary,
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      '&:hover': {
        color: "#00add7",
      },
      '& > *': {
        marginLeft: theme.spacing(1),
        transition: 'all 1s ease',

      },
    },
  })
);
export default ContributorLinks;
