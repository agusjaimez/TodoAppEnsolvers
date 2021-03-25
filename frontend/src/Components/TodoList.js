import React, { useState, useCallback, useEffect } from 'react'
import Todo from './Todo';
import TodoForm from './TodoForm'

const API_URL = process.env.REACT_APP_API_URL;

function TodoList() {
    const [todos, setTodos] = useState([]);

    useEffect(()=>{
        console.log(todos);
    },[todos]);

    useEffect(() => {
        fetch(`${API_URL}/all`, { method: 'GET' })
            .then(res => res.json())
            .then(
                (result) => {
                    setTodos(result);
                },
                (error) => {
                }
            )
    }, [])


    const addTodo = todo => {
        //Validates that the todo field is not empty
        if (todo.content ? !todo.content.trim() : true) return;
        let bd = {
            content: todo.content,
            done: 0
        }
        fetch(`${API_URL}/add`, { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify(bd) })
            .then(res => res.json())
            .then(
                (result) => {
                    setTodos(todos => [...todos, result]);
                },
                (error) => {
                }
            )

        console.log(todos);
    }

    const removeTodo = (todo) => {
        fetch(`${API_URL}/delete/${todo.id}`, { method: "DELETE" })
            .then(
                (result) => {
                    console.log(result);
                    setTodos(todos.filter(td => td.id !== todo.id));
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    //PUT USAGE
    const updateTodo = (todo, newContent) => {
        console.log("entro");
        console.log(todo);
    fetch(`${API_URL}/update/${todo.id}`, {
            method: 'PUT', headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ content: newContent, done: todo.done })
        })
        .catch(console.log);
    };

    const completeTodo = (todo, index) => (event) => {
        const newTodo = {
            ...todo,
            done: todo.done ? 0 : 1
        }
        const newTodos = [...todos];
        newTodos.splice(index, 1, newTodo);
        console.log(JSON.stringify(newTodos, null, 2));
        setTodos(newTodos);
        updateTodo(newTodo, todo.content);
    }

    const update = (todo, newValue) => {

        updateTodo(todo[0], newValue.content);
        setTodos(prev => prev.map(item => (item.id === todo[0].id ? {
            ...item,
            content:newValue.content
        }: item)));
      };

    return (
        <div>
            <h1>Todo List</h1>
                <TodoForm onSubmit={addTodo}></TodoForm>
                <Todo todos={todos} completed={completeTodo} removeTodo={removeTodo} updateTodo={update}>
            </Todo>
        </div>
    )
}

export default TodoList
