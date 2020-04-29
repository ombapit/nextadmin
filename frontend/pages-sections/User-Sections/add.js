import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import { Grid, Typography, Paper, Button} from '@material-ui/core';

import styles from "assets/jss/nextjs-material-kit/pages/components.js";
const useStyles = makeStyles(styles);

export default function add(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const handleChange = () => {
    props.onChange('index');
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Paper className={classes.box}>
          <Typography variant="h6">
            Add New
          </Typography>

          <Button variant="outlined" onClick={handleChange}>Cancel</Button>
        </Paper>
      </Grid>
    </Grid>
  );
}
