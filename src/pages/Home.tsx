import React, { useState } from 'react';
import { CssBaseline, Typography, AppBar, Toolbar, Tabs, Tab, Box, Grid, makeStyles } from '@material-ui/core';
import { Input, Card } from '../components/common';
import classNames from 'classnames';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(_ => ({
  root: {
    height: "100%",
  },
  flexContainer: {
    height: "100%",
  }
}));

function Home() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
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
              value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Movies" {...a11yProps(0)} />
              <Tab label="Actors" {...a11yProps(1)} />
            </Tabs>
          </Grid>
          <Grid item xs={12} sm={8}>

            <Input />
          </Grid>
        </Grid>

      </AppBar>
      <TabPanel value={value} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card />
          </Grid>
        </Grid>

      </TabPanel>
      <TabPanel value={value} index={1}>
        No results found
      </TabPanel>
    </>
  );
}

export default Home;
