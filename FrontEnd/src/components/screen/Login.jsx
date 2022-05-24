import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Login = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState("")
    useEffect(()=>{
        if(localStorage.getItem('authToken')){
            history.push('/')
        }
    },[history])
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const config = {
            headers:{
                "content-type": "application/json"
            } 
        }
        
        try {
            const {data} = await axios.post('/api/auth/login', {email, password}, config)
            await localStorage.setItem('authToken', data.token)
            history.push('/')
        }catch (error){
            setError(error.response.data.error)
        }
    }
    useEffect(() => {
            const timeOut = setTimeout(()=>{
                setError('')
            }, 5000)
        return () => {
            clearTimeout(timeOut)
        }
    }, [error])
    return (
        <div className='container-form'>
            <form className='form-group' onSubmit={handleSubmit}>
                <h3 className="form-title">Login</h3>
                <div className="error-container">
                    {error && <span className="error-form">{error}</span>}
                </div>
                <div className="form-input">
                    <label htmlFor="email">Email</label>
                    <input type="email"
                    id='email'
                    placeholder='Enter email'
                    required value={email}
                    onChange={(e)=> setEmail(e.target.value)} />
                </div>
                <div className="form-input">
                    <label htmlFor="password">Password</label>
                    <input type="password"
                    id='password'
                    placeholder='Enter password'
                    required value={password}
                    onChange={(e)=> setPassword(e.target.value)} />
                </div>
                
                <button type="submit">Confirm</button>
                <span className='account-link'> i don't have an account ? <Link to='/register'>create account</Link></span>
                <span className="account-link">
                <span className="or">||</span> i'm Forget password <Link to='/forgetpassword'>Forget Password</Link>
                </span>
            </form>
            
        </div>
    )
}

export default Login