import { Grid, Link } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import GitHubLogo from 'Assets/icons/github-logo.svg';
import SvgImg from 'Components/SvgImg';
import * as React from 'react';
import { Contributors } from 'States/contributors/model';

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
      '& > *': {
        marginLeft: theme.spacing(1),
      },
    },
  })
);

export interface Props {
  contributors: Contributors;
}

const ContributorLinks = ({ contributors }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      {contributors.map((contributor) => (
        <Grid key={contributor.name} className={classes.item} item md={3} sm={6} xs={12}>
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

export default ContributorLinks;
