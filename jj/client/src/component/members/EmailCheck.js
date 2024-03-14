import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


function EmailCheck() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const onSubmit = () => { }
    return (
        <div className='joinform'>
            <div className='wrap_join'>
                <div className="logo">Email Check</div>
                <div className='field'>
                    <input type="text" value={email} onChange={
                        (e) => { setEmail(e.currentTarget.value) }
                    } placeholder='EMAIL' />
                </div>
                <div className='btns'>
                    <button className='button'
                        onClick={() => { onSubmit() }}>Send</button>
                    <button className='button'
                        onClick={() => { navigate('/') }}>Back</button>
                </div>
            </div>
        </div>
    )
}

export default EmailCheck
