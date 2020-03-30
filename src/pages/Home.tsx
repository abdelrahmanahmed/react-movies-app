import React, { useState, useEffect } from 'react';
import {
  CssBaseline, Typography, AppBar, Toolbar,
  Tabs, Tab, Grid, makeStyles, CircularProgress
} from '@material-ui/core';
import { Input, TabPanel } from '../components/common';
import MoviesList from '../components/MoviesList';
import ActorsList from '../components/ActorsList';
import { SearchMovieService, FetchUpcomingMovieService } from '../services/MoviesService';
import { FetchActorsService } from '../services/ActorsService';
import useDebounce from '../ulti/hooks/useDebounce';
import { tabsConfig } from '../constatns';

const a11yProps = (index: string) => {
  return {
    id: `tab-${index}`,
  };
}

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  flexContainer: {
    height: "100%",
  }
}));

interface List{
  message?: string,
  response: string,
  payload: any
}

const HomePage = () => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState<any>(tabsConfig.movies);
  const [list, setList] = useState<List>({ response: 'loading', message: "", payload: [] });

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      const result = await FetchUpcomingMovieService();
      setList(result);
    }
    fetchUpcomingMovies();
  }, [])

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setList({ ...list, response: 'loading' });
        if (currentTab === tabsConfig.movies) {
          SearchMovieService(debouncedSearchTerm).then(results => {
            setList({ ...results });
          });
        }
        else {
          FetchActorsService(debouncedSearchTerm).then(results => {
            setList({ ...results });
          });
        }

      }
    },
    [debouncedSearchTerm]
  );

  const onNavigate = (event: React.ChangeEvent<{}>, newValue: number) => {
    const fetchUpcomingMovies = async () => {
      const result = await FetchUpcomingMovieService();
      setList({ ...result });
    }

    if (currentTab !== newValue) {
      setList({ ...{ response: 'loading', payload: [] } });
      if (newValue === tabsConfig.movies) {
        fetchUpcomingMovies();
      } else {
        setList({ ...{ response: 'success', payload: [] } });
      }
      setSearchTerm('');
      setCurrentTab(newValue);
    }
  };

  const onSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6">
            Movie searcher

          </Typography>
        </Toolbar>
      </AppBar>
      <AppBar position="relative" color="default">
        <Grid container>
          <Grid item xs={12} sm={4}>
            <Tabs classes={{
              root: classes.root,
              flexContainer: classes.flexContainer
            }}
              indicatorColor="primary"
              value={currentTab}
              onChange={onNavigate}
              aria-label="simple tabs example">
              <Tab label="Movies" {...a11yProps(tabsConfig.movies)} />
              <Tab label="Actors" {...a11yProps(tabsConfig.actors)} />
            </Tabs>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Input value={searchTerm} onChange={onSearchTerm} />
          </Grid>
        </Grid>

      </AppBar>
      <TabPanel value={currentTab} index={tabsConfig.movies}>
        {list.response === "loading" ?
          <Grid container justify="center"
          ><CircularProgress />
          </Grid> : null}
        {list.response === "success" ? <MoviesList list={list.payload} /> : null}
        {list.response === "error" ? list.message : null}
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        {list.response === "loading" ?
          <Grid container justify="center"
          ><CircularProgress />
          </Grid> : null}
        {list.response === "success" ? <ActorsList list={list.payload} /> : null}
        {list.response === "error" ? list.message : null}
      </TabPanel>
    </>
  );
}

export default HomePage;
