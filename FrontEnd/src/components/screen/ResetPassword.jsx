import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const ResetPassword = ({ match }) => {
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [success, setSuccess ] = useState("")
    const [error, setError ] = useState("")
    const [showLogin, setShowLogin] = useState('')
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
            const {data} = await axios.put(`/api/auth/resetpass/${match.params.resetToken}`, {password}, config)
            console.log(data)
            setShowLogin(data.data)
            setSuccess(data.data)
        }catch (error){
            setError(error.response.data.error)
        }
    }
    useEffect(() => {
            const timeOut = setTimeout(()=>{
                setError('')
            }, 5000)
            const timeSucess = setTimeout(()=>{
                setSuccess('')
            }, 7000)
        return () => {
            clearTimeout(timeOut)
            clearTimeout(timeSucess)
        }
    }, [error, success])
    return (
        <div className='container'>
            <form className='form-group' onSubmit={handleSubmit}>
                <h3 className="form-title">Reset Password</h3>
                <div className="error-container">
                    {error && <span className="error-form">{error}</span>}
                    {success && <span className="error-form success">{success}</span>}
                    {showLogin && <Link to='/login' className='login-url'>Login</Link>}
                </div>
                <div className="form-input">
                    <label htmlFor="password">New Password</label>
                    <input type="password"
                    id='password'
                    placeholder='Enter password'
                    required value={password}
                    onChange={(e)=> setPassword(e.target.value)} />
                </div>
                <div className="form-input">
                    <label htmlFor="confirmpassword">Confirm New Password</label>
                    <input type="password"
                    id='confimpassword'
                    placeholder='Enter confim password'
                    required value={confirmpassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)} />
                </div>
                <button type="submit">Confirm</button>
            </form>
            
        </div>
    )
}

export default ResetPassword