import React, { useState, useCallback } from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'

function Todo({ todos, completed, removeTodo, updateTodo }) {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })

    const submitUpdate = value => {
        if (value.content!=undefined) {
            updateTodo(todos.filter(todo => todo.id === edit.id), value);
            setEdit({
                id: null,
                value: ''
            })
        } else {
            setEdit({
                id: null,
                value: ''
            })
        }
    }
    if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate}></TodoForm>
    }

    return todos.map((todo, index) => (
        <div
            className='todo-row'
            key={todo.id}>
            <div>
                <input
                    type='checkbox'
                    defaultChecked={todo.done === 1}
                    onChange={completed(todo, index)}
                />
            </div>
            <div>
                {todo.content}
            </div>
            <div className="icons">
                <AiFillDelete
                    onClick={() => removeTodo(todo)}
                    className='delete-icon'
                ></AiFillDelete>
                <AiFillEdit
                    onClick={() => setEdit({ id: todo.id, value: todo.text })}
                    className='edit-icon'
                ></AiFillEdit>
            </div>
        </div>
    ))
}

export default Todo
