import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const ForgetPassword = ({ history }) => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState("")
    const [success, setSuccess ] = useState("")
    const [dataUrl, setDataUrl] = useState('')
   
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const config = {
            headers:{
                "content-type": "application/json"
            } 
        }
        
        try {
            const {data} = await axios.post('/api/auth/forgetpass', {email}, config)
            setSuccess(data.data)
            setDataUrl(data.resetUrl)
        }catch (error){
            setError(error.response.data.error)
            setEmail('')
            const timeOut = setTimeout(()=>{
                setError('')
            }, 5000)
        }
    }
    
    return (
        <div className='container'>
            <form className='form-group' onSubmit={handleSubmit}>
                <h3 className="form-title">Forget Password</h3>
                <div className="error-container">
                    <p className="text">please after input your email goes fast to your mail  because it's have been limits 10 minits</p>
                    {error && <span className="error-form">{error}</span>}
                    {success && <span className="error-form success">{success}</span>}
                </div>
                <div className="form-input">
                    <label htmlFor="email">Email</label>
                    <input type="email"
                    id='email'
                    placeholder='Enter email'
                    required value={email}
                    onChange={(e)=> setEmail(e.target.value)} />
                </div>
                <button type="submit">Confirm</button>
                <span className='account-link'> i don't have an account ? <Link to={dataUrl}>create account</Link></span>
            </form>
            
        </div>
    )
}

export default ForgetPassword