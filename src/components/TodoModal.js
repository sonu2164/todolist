import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { addTodo, updateTodo } from '../slices/todoSlice';
import styles from '../styles/modules/modal.module.scss';
import Button from './Button';

const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
};

function TodoModal({ type, modalOpen, setModalOpen, todo }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');
  const [priority, setPriority] = useState('High');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (type === 'update' && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
      setPriority(todo.priority);
      setDueDate(todo.dueDate || '');
    } else {
      setTitle('');
      setStatus('incomplete');
      setPriority('High');
      setDueDate('');
    }
  }, [type, todo, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === '') {
      toast.error('Please enter a title');
      return;
    }

    const newTodo = {
      id: type === 'add' ? uuid() : todo.id,
      title,
      status,
      priority,
      dueDate,
      time: new Date().toLocaleString(),
    };

    if (type === 'add') {
      dispatch(addTodo(newTodo));
      toast.success('Task added successfully');
    }
    if (type === 'update') {
      if (!areTodosEqual(todo, newTodo)) {
        dispatch(updateTodo(newTodo));
        toast.success('Task Updated successfully');
      } else {
        toast.error('No changes made');
        return;
      }
    }
    setModalOpen(false);
  };

  const areTodosEqual = (todo1, todo2) => {
    return (
      todo1.title === todo2.title &&
      todo1.status === todo2.status &&
      todo1.priority === todo2.priority &&
      new Date(todo1.dueDate).getTime() === new Date(todo2.dueDate).getTime()
    );
  };


  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.closeButton}
              onKeyDown={() => setModalOpen(false)}
              onClick={() => setModalOpen(false)}
              role="button"
              tabIndex={0}

              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <h1 className={styles.formTitle}>
                {type === 'add' ? 'Add' : 'Update'} TODO
              </h1>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>
              <label htmlFor="status">
                Status
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="complete">Completed</option>
                </select>
              </label>
              <label htmlFor="priority">
                Priority
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </label>
              <label htmlFor="dueDate">
                Due Date
                <input
                  type="date"
                  id="dueDate"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </label>
              <div className={styles.buttonContainer}>
                <Button type="submit" variant="primary">
                  {type === 'add' ? 'Add Task' : 'Update Task'}
                </Button>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TodoModal;
