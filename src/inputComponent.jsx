import React from 'react';
import Button from '@mui/material/Button';
import './todolist.css'

export default function inputComponent({ input, setInput, addNewTodo }) {
    const inputHandler = (e) => setInput(e.target.value);

    return (
        <div className="textField">
            <p style={{ fontSize: '2.2rem', color: '#cccdde', textShadow: ' 3px 0 5px #271c6c' }}><b >Todo App</b></p>
            <input
                className='input'
                value={input}
                onChange={inputHandler}
                placeholder='Add task'
            />
            <Button variant="contained" style={{ backgroundColor: '#646ff0', marginLeft: 10 }} onClick={addNewTodo}>
                Add
            </Button>
            <br />
        </div>
    );
} 
