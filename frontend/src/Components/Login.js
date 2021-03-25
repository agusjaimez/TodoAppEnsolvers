import React, { useState,useCallback,useEffect } from 'react'

function Login(props) {
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')

    useEffect(() => {
        
      },[]);

    const setNewUser = useCallback((event) => {
        setUser(event.target.value);
    }, []);

    const setNewPass = useCallback((event) => {
        setPass(event.target.value);
    }, []);

    return (
        <div>
            <h1>Welcome to Todo Web App</h1>
            <h1>Login</h1>
            <div className="todo-form">
                <form 
                id="login-data"
                onSubmit={props.onSubmit(user, pass)}
                >
                    <input
                        id="user"
                        value={user}
                        className='todo-input'
                        onChange={setNewUser} 
                        placeholder="User"/>
                    <input
                        id="pass"
                        value={pass}
                        className='todo-input'
                        onChange={setNewPass}
                        placeholder="Password" />
                    <button
                    className="login-btn">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
