import React from "react";
import Head from 'next/head';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import { Grid, Typography, Paper, Button} from '@material-ui/core';
import Header from "components/Header/Header.js";

import styles from "assets/jss/nextjs-material-kit/pages/components.js";
const useStyles = makeStyles(styles);

//import graph
import Graph1 from "pages-sections/Dashboard-Sections/graph1.js";

import { useShared } from 'store'

const Dashboard = (props) => {
  const classes = useStyles();
  const { ...rest } = props;

  const [general, setGeneral] = useShared('general')

  const data = new Array;
  data.push({"language":"PHP","value": 40});
  data.push({"language":"NodeJs","value": 20});
  data.push({"language":"Golang","value": 10});

  const testing = {"nama":"david"};

  return (
    <div className={classes.root}>
      <Head>
        <title>{`${process.env.web_title} - Dashboard`}</title>
      </Head>
      <Header
        brand="Admin Dashboard"
        active="Dashboard"
        {...rest}
      />
			<main className={classes.content}>
				<div className={classes.toolbar} />
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper className={classes.box}>
              <Typography>Nama: {general.user.nama}</Typography>
              <Button onClick={()=> { setGeneral({
                  type: 'SET',
                  payload: {
                    state: 'user',
                    data: testing
                  }
                }) }}>Set Cookie</Button>
              <Button onClick={()=> { setGeneral({
                  type: 'SET',
                  payload: {
                    state: 'user',
                    data: {}
                  }
                }) }}>Clear Cookie</Button>
              <Graph1 data={data} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.box}>xs=12</Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.box}>xs=12</Paper>
          </Grid>
        </Grid>
			</main>
		</div>
  );
}
export default Dashboard