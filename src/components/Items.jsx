//libraries
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
//components
import { Box, Button, Grid } from '@material-ui/core'
import ProductItem from './ProductItem'
//store
import { addItem } from '../store/cart'
import { setAlreadyPurchased, sortProduct } from '../store/products'

function Items() {
    const dispatch = useDispatch()
    const { items, category, isFetching, activeCategory } = useSelector(state => state.product)
    const { items: cartItems } = useSelector(state => state.cart)
    // const [activeCategory, setActiveCategory] = React.useState(0)

    const handleClickCategory = id => {
        dispatch(sortProduct(id))
    }

    const addItemToCart = obj => {
        dispatch(addItem(obj))
    }

    const alreadyPurchased = id => {
        dispatch(setAlreadyPurchased(id))
    }

    return (
        <>
            {/* Category sections */}
            <Grid container item xs={12}>
                {category.map(item => (
                    <Box key={item.id} component='span' m={1}>
                        <Button
                            color={item.id === activeCategory ? 'primary' : 'default'}
                            variant='contained'
                            onClick={() => handleClickCategory(item.id)}
                        >
                            {item.categoryTitle}
                        </Button>
                    </Box>
                ))}
            </Grid>

            {/* Item sections */}
            {items.map(product => (
                <Grid key={product.id} item xs={4}>
                    <ProductItem
                        item={product}
                        addedCount={cartItems[product.id] && cartItems[product.id].items.length}
                        addItemToCart={addItemToCart}
                        alreadyPurchased={alreadyPurchased}
                    />
                </Grid>
            ))}
        </>
    )
}

export default Items
