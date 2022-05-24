import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Register = ({ history }) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [error, setError] = useState("")
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const config = {
            headers:{
                "content-type": "application/json"
            } 
        }
        if (password !== confirmpassword) {
            setError('')
            setPassword('')
            setConfirmPassword('')
            setError('the passwords should be same')
            const timeOut = setTimeout(()=>{
                setError('')
            }, 5000)
            return 
        }
        try {
            const {data} = await axios.post('/api/auth/register', {username, email, password}, config)
            console.log(data.token)
            await localStorage.setItem('authToken', data.token)
            history.push('/')
        }catch (error){
            setError(error.response.data.error)
        }
    }
    
    return (
        <div className='container'>
            <form className='form-group' onSubmit={handleSubmit}>
                <h3 className="form-title">Register</h3>
                <div className="error-container">
                    {error && <span className="error-form">{error}</span>}
                </div>
                <div className="form-input">
                    <label htmlFor="username">Username</label>
                    <input type="text"
                    id='username'
                    placeholder='Enter Username'
                    required value={username}
                    onChange={(e)=> setUsername(e.target.value)} />
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
                <div className="form-input">
                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <input type="password"
                    id='confimpassword'
                    placeholder='Enter confim password'
                    required value={confirmpassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)} />
                </div>
                <button type="submit">Confirm</button>
                <span className='account-link'> already have an account ? <Link to='/login'>Sign-In</Link></span>
            </form>
            
        </div>
    )
}

export default Register
