import React from 'react'
import { Route } from 'react-router-dom'
//css
import './App.css'
//components
import Home from './pages/Home'
import SignIn from './pages/Signin'
import SignUp from './pages/Signup'

function App() {
    return (
        <div>
            <Route path='/' component={SignIn} exact />
            <Route path='/signup' component={SignUp} exact />
            <Route path='/home' component={Home} />
        </div>
    )
}

export default App
