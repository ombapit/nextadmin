import React, {useState,useEffect, useCallback} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Typography } from '@material-ui/core';
// core components
import Header from "components/Header/Header.js";
import MUIDataTable from "mui-datatables";

import styles from "assets/jss/nextjs-material-kit/pages/components.js";

const useStyles = makeStyles(styles);

export default function User(props) {
  const classes = useStyles();
  const { ...rest } = props;
	
	const [page, setPage] = useState(0);
	const [count, setCount] = useState(1);
	const [data, setData] = useState([["Loading Data..."]]);
	const [isLoading, setIsLoading] = useState(false);
	
	useEffect(() => {    
		getData();
	},[]);
	
	// get data
	const getData = () => {
    // do something with a, b and props.x
		setIsLoading(true);
		xhrRequest().then(res => {
			setData(res.data);
			setIsLoading(false);
			setCount(res.total);
		});
  };
	
	// mock async function
	const xhrRequest = () => {
		return new Promise((resolve, reject) => {
			const total = 124;  // mock record count from server
			// mock page data
			const srcData = [
				["Gabby George", "Business Analyst", "Minneapolis"],
				["Aiden Lloyd", "Business Consultant", "Dallas"],
				["Jaden Collins", "Attorney", "Santa Ana"],
				["Franky Rees", "Business Analyst", "St. Petersburg"],
				["Aaren Rose", "Business Analyst", "Toledo"]
			];
			const maxRound =  Math.floor(Math.random() * 2) + 1;
			const data = [...Array(maxRound)].reduce(acc => acc.push(...srcData) && acc, []);
			data.sort((a, b) => 0.5 - Math.random());

			setTimeout(() => {
				resolve({
					data, total
				});
			}, 2500);
		});
	}

	const changePage = (page) => {
		setIsLoading(true);
		xhrRequest(`/myApiServer?page=${page}`).then(res => {
			setPage(page);
			setData(res.data);
			setIsLoading(false);
			setCount(res.total);
		});
	};
	
	const columns = [{
        name: "Name",
        options: {
          filter: true,
          customFilterListOptions: { render: v => `Nama: ${v}` },
          filterType: 'textField'
        }
      }, "Title", "Location"];
	const options = {
		search: false,
		filter: true,
		filterType: 'textField',
		responsive: 'scrollFullHeight',
		download: false,
		print: false,
		serverSide: true,
		count: count,
		page: page,
		onTableChange: (action, tableState) => {
			console.log(action, tableState);
			switch (action) {
				case 'changePage':
					console.log('change');
					changePage(tableState.page);
					break;
				case 'filterChange':
					console.log('filter');
					changePage(tableState.page);
					break;
			}
		}
	};
	
  return (
    <div className={classes.root}>
      <Header
        brand="Admin Dashboard - User"
        {...rest}
      />
			<main className={classes.content}>
				<div className={classes.toolbar} />
					<MUIDataTable title={<Typography variant="h6">
						User List
						{isLoading && <CircularProgress size={24} style={{marginLeft: 15, position: 'relative', top: 4}} />}
						</Typography>
						} data={data} columns={columns} options={options} />
			</main>
		</div>
  );
}
