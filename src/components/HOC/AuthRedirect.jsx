//libraries
import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const AuthRedirect = Component => {
    const { isAuth } = useSelector(state => state.auth)

    if (!isAuth) return <Redirect to='/' />

    return class extends React.Component {
        render() {
            return <Component {...this.props} />
        }
    }
}

export default AuthRedirect
