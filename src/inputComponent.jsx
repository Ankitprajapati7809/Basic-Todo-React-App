import React from 'react';
import Button from '@mui/material/Button';
import './todolist.css'

export default function inputComponent({ input, setInput, addNewTodo }) {
    const inputHandler = (e) => setInput(e.target.value);

    return (
        <div className="textField">
            <p className='todoTitle'><b >Todo App</b></p>
            <input
                className='input'
                value={input}
                onChange={inputHandler}
                placeholder='Add task'
            />
            <Button variant="contained" onClick={addNewTodo}>
                Add
            </Button>
            <br />
        </div>
    );
} 
