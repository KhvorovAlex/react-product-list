import { productsAPI } from '../api/productsAPI'

const SET_PRODUCTS = 'products/SET_USER_DATA'
const SET_CATEGORY = 'products/SET_CATEGORY'
const TOGGLE_IS_FETCHING = 'products/TOGGLE_IS_FETCHING'
const SET_ALREADY_PURCHASED = 'products/SET_ALREADY_PURCHASED'

const initialState = {
    items: [],
    category: [],
    isFetching: false,
}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                ...state,
                items: action.payload,
                isFetching: false,
            }

        case SET_CATEGORY:
            return {
                ...state,
                category: action.payload,
                isFetching: false,
            }

        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload,
            }

        case SET_ALREADY_PURCHASED:
            return {
                ...state,
                items: state.items.map(item => {
                    if (item.id === action.payload) {
                        if (item.alreadyPurchased && item.alreadyPurchased === true) {
                            item.alreadyPurchased = false
                        } else {
                            item.alreadyPurchased = true
                        }
                    }
                    return item
                }),
            }

        default:
            return state
    }
}

const setLoadedProducts = items => ({
    type: SET_PRODUCTS,
    payload: items,
})

const setLoadedCategory = items => ({
    type: SET_CATEGORY,
    payload: items,
})

const setToggleIsFetching = fetching => ({
    type: TOGGLE_IS_FETCHING,
    payload: fetching,
})

export const setAlreadyPurchased = id => ({
    type: SET_ALREADY_PURCHASED,
    payload: id,
})

export const setProduct = () => {
    return async dispatch => {
        dispatch(setToggleIsFetching(true))
        const product = await productsAPI.getProducts()
        const category = await productsAPI.getProductsCategory()
        if (product.status === 200 && category.status === 200) {
            dispatch(setLoadedProducts(product.data))
            dispatch(setLoadedCategory(category.data))
        }
    }
}

export const sortProduct = params => {
    return async dispatch => {
        dispatch(setToggleIsFetching(true))
        const product = await productsAPI.getSortProducts(params)
        if (product.status === 200) {
            dispatch(setLoadedProducts(product.data))
        }
    }
}

export default productsReducer
