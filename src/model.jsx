import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function modalComponent({ open, handleClose, todoValue, handleChangeTodoValue, saveUpdateTodo }) {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Edit your Task</h2>
          <TextField
            fullWidth
            id="fullWidth"
            value={todoValue}
            onChange={handleChangeTodoValue}
          />
          <br />
          <br />
          <Button onClick={saveUpdateTodo}>
            Update task
          </Button>
        </Box>
      </Modal>
    </>
  )
}




















