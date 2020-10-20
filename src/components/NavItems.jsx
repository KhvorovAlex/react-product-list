//libraries
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
//components
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import InboxIcon from '@material-ui/icons/Inbox'
import Basket from '@material-ui/icons/ShoppingBasketOutlined'
import AddIcon from '@material-ui/icons/PlaylistAddOutlined'
import { Link } from 'react-router-dom'
import { Badge } from '@material-ui/core'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}))

export default function NavItems() {
    const classes = useStyles()
    const { totalCount } = useSelector(state => state.cart)

    return (
        <div className={classes.root}>
            <List component='nav' aria-label='main mailbox folders'>
                <Link to='/home'>
                    <ListItem button>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary='Товары' />
                    </ListItem>
                </Link>

                <Link to='/home/cart'>
                    <ListItem button>
                        <ListItemIcon>
                            <Badge color='secondary' variant='dot' invisible={!totalCount}>
                                <Basket />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText primary='Корзина' />
                    </ListItem>
                </Link>

                <Link to='/home/additem'>
                    <ListItem button>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary='Добавить товар' />
                    </ListItem>
                </Link>

                <Link to='/home/addcategory'>
                    <ListItem button>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary='Добавить категорию' />
                    </ListItem>
                </Link>
            </List>
            <Divider />
        </div>
    )
}
