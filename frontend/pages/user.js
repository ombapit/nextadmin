import React, {useState,useEffect, useCallback} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Typography, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
// core components
import Header from "components/Header/Header.js";
import MUIDataTable from "mui-datatables";

import styles from "assets/jss/nextjs-material-kit/pages/components.js";
const useStyles = makeStyles(styles);

import { fetchList, fetchCRUD } from '../utils/fetchJSON';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function User(props) {
  const classes = useStyles();
  const { ...rest } = props;
	
	const [page, setPage] = useState(0);
	const [count, setCount] = useState(1);
	const [data, setData] = useState([["","Loading Data..."]]);
	const [isLoading, setIsLoading] = useState(false);
	const [serverSideFilterList, setServerSideFilterList] = useState([]);
	const [sortDirection, setSortDirection] = useState(['none','none','none','desc']);
	const [alert,setAlert] = useState({'state':false,'msg':''});
	
	useEffect(() => {    
		getData();
	},[]);
	
	// get data
	const getData = async (page = 1, filterList = [], order = {}) => {

		setIsLoading(true);
		let data = await fetchList(`${process.env.api}api/users?page=${page}`,{
			method: 'POST',
			body: { filter: { ...filterList }, order: order }
		});

		const total = data.total;
		data = data.data.map(item => {
			return [item.id,item.name,item.email,item.created_at];
		});

		setData(data);
		setIsLoading(false);
		setCount(total);

		setServerSideFilterList(filterList);
	};
	
	//delete data
	const deleteData = async (param) => {
		setIsLoading(true);
		let res = await fetchCRUD(`${process.env.api}api/users/delete_batch`,{
			method: 'POST',
			body: { param: param }
		});
		setIsLoading(false);
		//alert
		if (res.data.success == true) {
			setAlert({'state':true,'msg':res.data.msg});
			getData();
		}
	};
	
	const columns = [{
        name: "id",
        options: {
					display: false,
					filter: false,
          // customFilterListOptions: { render: v => `Nama: ${v}` },
          // filterType: 'textField'
        }
			}, 
			{
        name: 'name',
        options: {
					label: 'Name',
          filter: true,
					filterList: serverSideFilterList[1],
					sortDirection: sortDirection[1]
        },
			},
			{
        name: 'email',
        options: {
					label: 'Email',
          filter: true,
					filterList: serverSideFilterList[2],
					sortDirection: sortDirection[2]
        },
      },
			{
        name: 'created_at',
        options: {
					label: 'Created At',
          filter: false,
					filterList: serverSideFilterList[3],
					sortDirection: sortDirection[3]
        },
			}];
			
	const options = {
		search: false,
		filter: true,
		filterType: 'textField',
		serverSideFilterList: serverSideFilterList,
		responsive: 'scrollFullHeight',
		download: false,
		print: false,
		serverSide: true,
		count: count,
		page: page,
		// rowsPerPage: 1,
		onFilterChange: (column, filterList, type) => {
			if (type === 'chip') {
				// console.log('updating filters via chip');
				handleFilterSubmit(filterList)();
			}
		},
		customFilterDialogFooter: filterList => {
			return (
				<div style={{ marginTop: '40px' }}>
					<Button variant="contained" onClick={handleFilterSubmit(filterList)}>Apply Filters*</Button>
				</div>
			);
		},
		onColumnSortChange: (changedColumn, direction) => {
			// console.log(direction);
			if (direction == 'ascending') {
				direction = 'asc';
			} else {
				direction = 'desc';
			}

			//setting state untuk sorting
			let arr_direction = new Array;
			arr_direction.push('none');//record hidden
			changedColumn == 'name' ? arr_direction.push(direction) : arr_direction.push('none');
			changedColumn == 'email' ? arr_direction.push(direction) : arr_direction.push('none');
			changedColumn == 'created_at' ? arr_direction.push(direction) : arr_direction.push('none');

			// console.log(arr_direction);
			setSortDirection(arr_direction);

			const order = {'column': changedColumn, 'sort': direction};
			getData(1,serverSideFilterList,order);
		},
		onTableChange: (action, tableState) => {
			// console.log(action, tableState);
			switch (action) {
				case 'changePage':
					setPage(tableState.page + 1);
					getData(tableState.page + 1);
					break;
			}
		},
		onRowsDelete: (rowsDeleted) => {
			const idsToDelete = rowsDeleted.data.map(d => data[d.dataIndex][0]);
			// console.log(idsToDelete);
			deleteData(idsToDelete);

		}
	};

	//filtering
	const handleFilterSubmit = filterList => () => {
		// console.log('Submitting filters: ', filterList);
		getData(1,filterList);
	};
	
	//close alert
	const snackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({'state':false,'msg':''});
	};
	
	//form add
	const formAdd = () => {
		console.log('add');
	}
	
  return (
    <div className={classes.root}>
      <Header
        brand="Admin Dashboard - User"
        {...rest}
      />
			<main className={classes.content}>
				<div className={classes.toolbar} />
					<MUIDataTable title={<Typography variant="h6">
						User List&nbsp;
						<Button variant="contained" color="primary">Add New</Button>
						{isLoading && <CircularProgress size={24} style={{marginLeft: 15, position: 'relative', top: 4}} />}
						</Typography>
						} data={data} columns={columns} options={options} />
			</main>
			
			<Snackbar open={alert.state} autoHideDuration={6000} onClose={snackClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
				<Alert onClose={snackClose} severity="success">{alert.msg}</Alert>
			</Snackbar>
		</div>
  );
}
