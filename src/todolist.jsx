import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as React from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import ModalComponent from './model';
import InputComponent from './inputComponent';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function TodoList() {
  const [open, setOpen] = React.useState(false);
  const [todoList, setTodoList] = useState(() => {

    const storedTodoList = localStorage.getItem('lists');
    return storedTodoList ? JSON.parse(storedTodoList) : [
      { task: "Eat", id: uuidv4(), isDone: false, createdAt: new Date() },
      { task: "Sleep", id: uuidv4(), isDone: false, createdAt: new Date() },];

  }
  );
  const [input, setInput] = useState("");
  const [todoValue, setTodoValue] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null); // New state to track the task being edited
  const [filter, setFilter] = useState('all');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditingTaskId(null); // Reset editing task ID when closing the modal
  };

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(todoList));
  }, [todoList]);

  const addNewTodo = () => {
    if (input !== "") {
      const newTodo = { task: input, id: uuidv4(), isDone: false, createdAt: new Date() }
      setTodoList([...todoList, newTodo]);
      setInput("");
    }
  };

  const handleEdit = (task) => {
    setTodoValue(task);
    handleOpen();
    setEditingTaskId(todoList.find((x) => x.task === task).id);
  };

  const handleChangeTodoValue = (e) => setTodoValue(e.target.value);

  const saveUpdateTodo = () => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((todo) =>
        todo.id === editingTaskId ? { ...todo, task: todoValue } : todo
      )
    );
    handleClose();
  };

  const handleDelete = (id) => {
    setTodoList(todoList.filter((x) => x.id !== id));
  };

  let lineTrough = (id) => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  let deleteAllTask = () => {
    setTodoList([]);
  }

  let handelFiltersChange = (e) => {
    setFilter(e.target.value);
  }

  let handelFilters = () => {
    const filteredList = todoList.filter((todo) => {
      if (filter === 'completed') {
        return todo.isDone;
      } else if (filter === 'active') {
        return !todo.isDone;
      } else {
        return true;
      }
    })
    return filteredList.map((todo) => ({ ...todo, createdAt: todo.createdAt || new Date() }));

  }

  const deleteCompletedTask = () => {
    setTodoList(todoList.filter((todo) => !todo.isDone));
  }

  return (
    <div className='container'>
      <InputComponent input={input} setInput={setInput} addNewTodo={addNewTodo} />

      <div className="filter">
        <select className='filter-area' name='isActive' onClick={handelFilters} onChange={handelFiltersChange}>
          <option value="all" >All</option>
          <option value="active" >Active</option>
          <option value="completed" >Completed</option>
        </select>
      </div>

      <div className='taskContainer'>
        {handelFilters().map((x) => (
          <div key={x.id} className="task" >
            <div className="taskediter">
              <p style={x.isDone ? { textDecorationLine: "line-through" } : {}} > {x.task}</p>
              <p style={{ fontSize: '12px' }}>{x.createdAt.toLocaleString('en-IN', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Kolkata' })}</p>
            </div>
            <div >
              <Checkbox style={{ color: '#646ff0' }} checked={x.isDone} onChange={() => lineTrough(x.id)} />
              <Button onClick={() => handleEdit(x.task)}><EditIcon style={{ color: 'gray' }} /></Button>
              <Button onClick={() => handleDelete(x.id)} className='delete' ><DeleteIcon style={{ color: 'gray' }} /></Button>
            </div>
          </div>
        ))}
      </div>

      <div className="deleteButtons">
        <Button onClick={deleteAllTask}>Delete all task</Button>
        <Button onClick={deleteCompletedTask}>Delete completed task</Button>
      </div>

      <ModalComponent
        open={open}
        handleClose={handleClose}
        todoValue={todoValue}
        handleChangeTodoValue={handleChangeTodoValue}
        saveUpdateTodo={saveUpdateTodo} />
    </div>
  );
}
