import { userAPI } from '../api/userAPI'

const SET_USER_DATA = 'auth/SET_USER_DATA'

const initialState = {
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    promo: null,
    isAuth: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state
    }
}

export const setUserData = ({ id, email, firstName, lastName, promo, isAuth = true }) => ({
    type: SET_USER_DATA,
    payload: { id, email, firstName, lastName, promo, isAuth },
})

export const loginUser = body => {
    return async dispatch => {
        const response = await userAPI.login(body)
        if (response.status === 200) {
            const user = await userAPI.getUser(body.email)
            dispatch(setUserData(user))
        }
    }
}

export const logoutUser = () => {
    return async dispatch => {
        dispatch(
            setUserData({
                id: null,
                email: null,
                firstName: null,
                lastName: null,
                promo: null,
                isAuth: false,
            })
        )
    }
}

export default authReducer
