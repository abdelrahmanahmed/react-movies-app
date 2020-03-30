import React from 'react';
import { Grid, Typography, Chip, makeStyles } from '@material-ui/core';
import { Card } from './common';

const useStyles = makeStyles(() => ({
  ellipsis: {

  },

}));

const MoviesList = ({ list }: any) => {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      {list.length ? list.map((el: any) => (
        <Grid key={el.id} item xs={12} sm={4}>
          <Card>
            <Chip color="primary" label={`${el.title}`} />
            <Typography className={classes.ellipsis}>{el.overview}</Typography>
          </Card>
        </Grid>
      )) : "no result"}

    </Grid>
  );
}

export default MoviesList;