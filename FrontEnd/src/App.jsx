import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import PrivateRoute from './components/Routes/PrivateRoute'
import ForgetPassword from './components/screen/ForgetPassword'
import Login from './components/screen/Login'
import PrivateScreen from './components/screen/PrivateScreen'
import Register from './components/screen/Register'
import ResetPassword from './components/screen/ResetPassword'


const App = () => {
    return (
        <Router>
            <div className="app">
                <Switch>
                    <PrivateRoute exact  path='/' component={PrivateScreen} />
                    <Route exact path='/register' component={Register}></Route>
                    <Route exact path='/login' component={Login}></Route>
                    <Route exact path='/resetpass/:resetToken' component={ResetPassword}></Route>
                    <Route exact path='/forgetpassword' component={ForgetPassword}></Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
