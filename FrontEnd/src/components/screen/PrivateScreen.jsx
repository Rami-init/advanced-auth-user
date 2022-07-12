import axios from 'axios'
import React, { useState, useEffect } from 'react'

const PrivateScreen = ({history}) => {
    const [error, setError] = useState('')
    const [privateData, setPrivateData] = useState('')
    useEffect(() => {
        if(!localStorage.getItem('authToken')) {
            history.pushState('/login')
        }
        const fetchprivateDate = async ()=>{
            try {
                const config = {
                    headers :{
                        "content-type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                }
                const {data} = await axios.get('/api/private', config)
                setPrivateData(data.data)
            } catch (error) {
                localStorage.removeItem('authToken')
                setError(error.response.data.error)
            }
        }
        fetchprivateDate()
    }, [history])
    const handleLogOut = ()=>{
        localStorage.removeItem('authToken')
        history.push('/login')
    }
    return error ? (
        <div className="error-container">
            {error && <span className="error-form">{error}</span>}
        </div>
    ): (
       <nav>
           <div className="username">{privateData}</div>
           <button type='button' onClick={handleLogOut} className='logout'>Log-Out</button>
       </nav> 
    )
}

export default PrivateScreen
