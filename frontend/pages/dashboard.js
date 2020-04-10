import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
// core components
import Header from "components/Header/Header.js";

import styles from "assets/jss/nextjs-material-kit/pages/components.js";

const useStyles = makeStyles(styles);

export default function Dashboard(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div className={classes.root}>
      <Header
        brand="Admin Dashboard"
        {...rest}
      />
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Typography paragraph>
					Dashboard
				</Typography>
			</main>
		</div>
  );
}
