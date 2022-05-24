import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({component: Component, ...reset}) => {
    return (
       <Route
       {...reset}
       render={(props)=>
            localStorage.getItem('authToken')?(
               <Component {...props} />
           ):(
               <Redirect to='/login' />
           )
       }
       ></Route>
    )
}
export default PrivateRoute