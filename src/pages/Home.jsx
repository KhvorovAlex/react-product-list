//libraries
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Route } from 'react-router-dom'
//HOC
import AuthRedirect from '../components/HOC/AuthRedirect'
//components
import { Grid } from '@material-ui/core'
import Header from '../components/Header'
import NavItems from '../components/NavItems'
import Items from '../components/Items'
import Cart from '../components/Cart'
import AddItem from '../components/AddItem'
import AddCategory from '../components/AddCategory'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
}))

function HomePage() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Header />
            <Grid style={{ padding: '30px 10px 30px 10px' }} container>
                {/* навигация */}
                <Grid container item xs={3}>
                    <NavItems />
                </Grid>

                {/* Главный экран */}
                <Grid
                    style={{ padding: '30px 10px 30px 10px' }}
                    container
                    item
                    justify='space-between'
                    xs={9}
                    spacing={3}
                >
                    <Route path='/home' exact component={Items} />
                    <Route path='/home/additem' exact component={AddItem} />
                    <Route path='/home/addcategory' exact component={AddCategory} />
                    <Route path='/home/cart' exact component={Cart} />
                </Grid>
            </Grid>
        </div>
    )
}

const Home = AuthRedirect(HomePage)

export default Home
