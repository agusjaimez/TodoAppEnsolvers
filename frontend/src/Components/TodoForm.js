import React, { useState, useCallback, useEffect, useRef } from 'react'

export default function TodoForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    })

    const onsetInput = event => {
        setInput(event.target.value);
    }

    const submit = e => {
        e.preventDefault();

        props.onSubmit({
            content: input,
            done: false
        });
        setInput('');
    };

    return (
        <div>
            {props.edit ? (
                <form className="todo-form" onSubmit={submit}>
                    <input type="text"
                        placeholder="New Todo Text (Leave Blank to Cancel)"
                        value={input}
                        name="text"
                        className='todo-input'
                        onChange={onsetInput}
                        ref={inputRef} />
                    <button className="todo-button">Update</button>
                </form>
            ) : (
                <form className="todo-form" onSubmit={submit}>
                    <input type="text"
                        placeholder="Add a todo"
                        value={input}
                        name="text"
                        className='todo-input'
                        onChange={onsetInput}
                        ref={inputRef} />
                    <button className="todo-button">Add</button>
                </form>
            )}
        </div>
    )
}
