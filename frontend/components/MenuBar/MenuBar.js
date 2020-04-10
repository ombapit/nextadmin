import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Icon from '@material-ui/core/Icon'
import { withStyles } from '@material-ui/core/styles'

import Link from 'next/link'
import menuItems from './menuItems'
const styles = {
  list: {
    width: 250,
  },
  links: {
    textDecoration:'none',
		display: 'flex',
		alignItems: 'center',
		color: 'inherit'
  },
  menuHeader: {
    paddingLeft: '30px'
	}
};

class MenuBar extends Component {
  constructor( props ) {
    super( props )
    this.state = {}
  }
	
	// this method sets the current state of a menu item i.e whether it is in expanded or collapsed or a collapsed state
	handleClick( item ) {
		this.setState( prevState => (
			{ [ item ]: !prevState[ item ] } 
		) )
	}
	
	// if the menu item doesn't have any child, this method simply returns a clickable menu item that redirects to any location and if there is no child this method uses recursion to go until the last level of children and then returns the item by the first condition.
	
	handler( children ) {
		const { classes } = this.props
		const { state } = this
		
		return children.map( ( subOption ) => {
			if ( !subOption.children ) {
				return (
					<Link href={ subOption.url } key={ subOption.name }>
						<div key={ subOption.name }>
							<ListItem 
								button 
								key={ subOption.name }>
									<a className={ classes.links }>
										<ListItemIcon>
											<Icon>{ subOption.icon }</Icon>
										</ListItemIcon>
										<ListItemText 
											primary={ subOption.name } 
										/>
									</a>
								{/*<Link 
									to={ subOption.url }
									className={ classes.links }>
									<ListItemText 
										inset 
										primary={ subOption.name } 
									/>
								</Link>*/}
							</ListItem>
						</div>
					</Link>
				)
			}
			return (
				<div key={ subOption.name }>
					<ListItem 
						button 
						onClick={ () => this.handleClick( subOption.name ) }>
						<ListItemIcon>
							<Icon>{ subOption.icon }</Icon>
						</ListItemIcon>
						<ListItemText
							primary={ subOption.name } />
						{ state[ subOption.name ] ? 
							<ExpandLess /> :
							<ExpandMore />
						}
					</ListItem>
					<Collapse 
						in={ state[ subOption.name ] } 
						timeout="auto" 
						unmountOnExit
					>
						{ this.handler( subOption.children ) }
					</Collapse>
				</div>
			)
		} )
	}
	
	render() {
    return (
      <div>
				{ this.handler( menuItems.data ) }
			</div>
    )
  }
}
export default withStyles(styles)(MenuBar)