const ADD_ITEM = 'cart/ADD_ITEM'
const PLUS_ITEM = 'cart/PLUS_ITEM'
const MINUS_ITEM = 'cart/MINUS_ITEM'
const DELETE_ITEM = 'cart/DELETE_ITEM'
const CLEAR_CART = 'cart/CLEAR_CART'

const initialState = {
    items: {},
    totalCount: 0,
    totalPrice: 0,
}

//расчитываем общее кол-во товаров
const getTotalCount = (oldItems, currentItems, id) => {
    let acum = 0
    for (let key in oldItems) {
        if (key !== id) {
            acum += oldItems[key].items.length
        }
    }
    return acum + currentItems.length
}

//расчитываем общую стоимость товаров
const getTotalSum = (oldItems, currentItems, id) => {
    let acum = 0
    for (let key in oldItems) {
        if (key !== id) {
            acum += oldItems[key].totalPrice
        }
    }
    return acum + currentItems.length * currentItems[0].price
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        //Добавляем товар в корзину
        case ADD_ITEM: {
            const newItem = !state.items[action.payload.id] //если данной пиццы нет в корзине
                ? [action.payload] //то создаем массив и ложим в него пиццу (obj)
                : [...state.items[action.payload.id].items, action.payload] //получаем массив и ложим в конец пиццу (obj)

            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: {
                        items: newItem,
                        totalPrice: newItem.length * action.payload.price,
                        totalCount: newItem.length,
                    },
                },
                totalCount: state.totalCount + 1, //увеличиваем кол-во купленных пицц на единицу
                totalPrice: state.totalPrice + action.payload.price, //прибавляем стоимость купленной пиццы
            }
        }

        //уменьшаяем кол-во пицц в корзине
        case MINUS_ITEM: {
            const oldItems = state.items[action.id].items
            const newItems = oldItems.length > 1 ? oldItems.slice(1) : oldItems

            return {
                ...state,
                items: {
                    ...state.items,
                    [action.id]: {
                        items: newItems,
                        totalPrice: newItems.length * newItems[0].price,
                        totalCount: newItems.length,
                    },
                },
                totalCount: getTotalCount(state.items, newItems, action.id),
                totalPrice: getTotalSum(state.items, newItems, action.id),
            }
        }

        //увеличиваем кол-во пицц в корзине
        case PLUS_ITEM: {
            const newItems = [...state.items[action.id].items, state.items[action.id].items[0]]

            return {
                ...state,
                items: {
                    ...state.items,
                    [action.id]: {
                        items: newItems,
                        totalPrice: newItems.length * newItems[0].price,
                        totalCount: newItems.length,
                    },
                },
                totalCount: getTotalCount(state.items, newItems, action.id),
                totalPrice: getTotalSum(state.items, newItems, action.id),
            }
        }

        //удаление пиццы
        case DELETE_ITEM: {
            const newItems = {
                ...state.items,
            }
            const currentItemTotalCont = state.items[action.id].totalCount
            const currentItemTotalPrice = state.items[action.id].totalPrice

            delete newItems[action.id]

            return {
                ...state,
                items: {
                    ...newItems,
                },
                totalCount: state.totalCount - currentItemTotalCont,
                totalPrice: state.totalPrice - currentItemTotalPrice,
            }
        }

        //Очистка корзины
        case CLEAR_CART:
            return {
                ...state,
                items: {},
                totalCount: 0,
                totalPrice: 0,
            }

        default:
            return state
    }
}

export default cartReducer

//actions

export const addItem = obj => ({ type: ADD_ITEM, payload: obj })
export const deleteItem = id => ({ type: DELETE_ITEM, id })
export const plusItem = id => ({ type: PLUS_ITEM, id })
export const minusItem = id => ({ type: MINUS_ITEM, id })
export const clearCart = () => ({ type: CLEAR_CART })
