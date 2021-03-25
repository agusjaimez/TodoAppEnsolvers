import React,{useState} from 'react'
import Login from './Login'
import TodoList from './TodoList'



function Switcher() {
    const [active,setActive]=useState('1')
    const password="1234"
    const user="user"

    const login=(user, pass)=>{

        if(pass===password && user===user){
            setActive((active)=>{
                active='2'
            })
        }
    }

    return (
        <div>
            {active==='1'? (
                <Login onSubmit={login}></Login>
            ):(
                <TodoList></TodoList>
            )}
        </div>
    )
}

export default Switcher
