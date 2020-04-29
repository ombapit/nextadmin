import React, { useEffect } from 'react';
import Router from 'next/router';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import MenuBar from 'components/MenuBar/MenuBar.js';
import profileImage from "assets/img/faces/avatar.jpg";

import {useShared} from 'store';

import styles from "assets/jss/nextjs-material-kit/pages/componentsSections/headerStyle.js";

const useStyles = makeStyles(styles);

export default function Header(props) {
  const { ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const openAnchor = Boolean(anchorEl);

  const [general,setGeneral] = useShared('general');
  const [open, setOpen] = React.useState(true);
	
	const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //logout script
  const [dopen, setDopen] = React.useState(false);
  const handleClickDopen = () => {
    handleClose();
    setDopen(true);
  };
  const logoutClose = () => {
    setDopen(false);
  };
  const logoutAgree = () => {
    setGeneral({
      type: 'SET',
      payload: {
        state: 'authenticated',
        data: false
      }
    })
    setGeneral({
      type: 'SET',
      payload: {
        state: 'user',
        data: {}
      }
    })
    Router.push('/login');
  };
	
	useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 1224) {
				setOpen(false);
			} else {
				setOpen(true);
			}
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
	
	const { brand } = props;

  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
					
					<Typography variant="h6" noWrap className={classes.flex}>
						{brand}
					</Typography>
					
					<div>
						Welcome Dave
						<IconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={openAnchor}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose}>My account</MenuItem>
							<MenuItem onClick={handleClickDopen}>Logout</MenuItem>
						</Menu>
					</div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
					<img
						src={profileImage}
						className={classes.img}
						alt="profile"
					/>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
					<MenuBar {...rest}/>
        </List>
      </Drawer>

      <Dialog
        open={dopen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure to logout?"}</DialogTitle>
        <DialogActions>
          <Button onClick={logoutClose} color="primary">
            Cancel
          </Button>
          <Button onClick={logoutAgree} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
		</div>
  );
}