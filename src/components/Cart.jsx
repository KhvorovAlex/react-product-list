import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import DeleteIcon from '@material-ui/icons/Delete'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import { deleteItem } from '../store/cart'
import { Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}))

function Cart() {
    const classes = useStyles()
    const { items } = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const handleClickDeleteItem = id => {
        if (window.confirm('Вы действительно хотите удалить данынй товар?')) {
            dispatch(deleteItem(id))
        }
    }

    console.log(Object.keys(items).length)

    return (
        <List dense className={classes.root}>
            {Object.keys(items).length ? (
                Object.keys(items).map(id => {
                    if (items[id]) {
                        const labelId = `checkbox-list-secondary-label-${items[id].items[0].id}`
                        return (
                            <ListItem key={items[id].items[0].id} button>
                                <Grid>
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={items[id].items[0].name}
                                            src={items[id].items[0].imageUrl}
                                        />
                                    </ListItemAvatar>
                                </Grid>

                                <Grid xs={6}>
                                    <ListItemText id={labelId} primary={items[id].items[0].name} />
                                </Grid>

                                <Grid xs={2}>
                                    <ListItemText
                                        primary={`${items[id].totalCount} штук`}
                                        style={{ color: 'red' }}
                                    />
                                </Grid>

                                <Grid>
                                    <ListItemSecondaryAction
                                        onClick={() => handleClickDeleteItem(items[id].items[0].id)}
                                    >
                                        <IconButton aria-label='delete' className={classes.margin}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </Grid>
                                <Grid>
                                    <ListItemText
                                        primary={`Всего на ${items[id].totalPrice} руб.`}
                                        style={{ color: 'green' }}
                                    />
                                </Grid>
                            </ListItem>
                        )
                    }
                })
            ) : (
                <Typography variant='h2'>Корзина пуста</Typography>
            )}
        </List>
    )
}

export default Cart
