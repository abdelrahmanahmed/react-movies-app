import React from 'react';
import { Grid, Typography, Chip, makeStyles } from '@material-ui/core';
import { Card } from './common';

const useStyles = makeStyles(() => ({
  moviesContainer: {
    margin: "5px 5px 5px 0",
  },
  movie: {
    marginRight: '2px',
    marginBottom: '4px'
  }
}));

const ActorsList = ({ list }: any) => {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      {list.length ? list.map((el: any) => (
        <Grid key={el.id} item xs={12} sm={4}>
          <Card>
            <Grid container>
              <Grid container item xs={12} justify="center">
                <Typography variant="h5">{el.name}</Typography>

              </Grid>
              <Grid item xs={12}>
                <Chip color="secondary" size="small" label={'Movies'} />
              </Grid>
              <Grid item xs={12} className={classes.moviesContainer}>
                {
                  el.known_for.map((el: any) => (
                    <Chip className={classes.movie}
                      key={el.id}
                      color="default"
                      size="small"
                      label={el.original_title ? el.original_title : el.original_name} />
                  ))
                }
              </Grid>

            </Grid>

          </Card>
        </Grid>
      )) : "No results found"}

    </Grid>
  );
}

export default ActorsList