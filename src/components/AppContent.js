
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/modules/app.module.scss';
import TodoItem from './TodoItem';
import withAuth from './hoc/withAuth';
import AppHeader from './AppHeader';
import PageTitle from './PageTitle'
import Logout from './Logout'
import Lottie from 'react-lottie';
import todo from '../asset/todo'


const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function AppContent() {

  const todoList = useSelector((state) => state.todo.todoList);
  const filterStatus = useSelector((state) => state.todo.filterStatus);
  const sortBy = useSelector((state) => state.todo.sortBy);
  const sortOrder = useSelector((state) => state.todo.sortOrder);


  const todoopt = {
    loop: true,
    autoplay: true,
    animationData: todo,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };


  const sortedTodoList = [...todoList].sort((a, b) => {

    if (sortBy === 'dueDate') {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortBy === 'priority') {
      return sortOrder === 'asc'
        ? a.priority.localeCompare(b.priority)
        : b.priority.localeCompare(a.priority);
    }


    return sortOrder === 'asc'
      ? new Date(a.time) - new Date(b.time)
      : new Date(b.time) - new Date(a.time);
  });

  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === 'all') {
      return true;
    }
    return item.status === filterStatus;
  });

  return (
    <div >

      <div style={{ display: "flex", flexDirection: "row", justifyContent: "end" }}>
        <Logout />
      </div>
      <div >
        <PageTitle >To Do List</PageTitle>
        <AppHeader />

        <motion.div
          className={styles.content__wrapper}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredTodoList && filteredTodoList.length > 0 ? (
              filteredTodoList.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))
            ) : (
              <motion.p variants={child} className={styles.emptyText}>
                No Todos
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <div className={styles.todo}>
        <Lottie className={styles.todo}
          options={todoopt}
          height={400}
          width={400}


        />
      </div>

    </div >

  );
}

export default withAuth(AppContent);
