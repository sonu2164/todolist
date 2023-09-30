

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button, { SelectButton } from './Button';
import styles from '../styles/modules/app.module.scss';
import TodoModal from './TodoModal';
import { updateFilterStatus, setSortCriteria } from '../slices/todoSlice';
import add from '../asset/add'


function AppHeader() {
  const [modalOpen, setModalOpen] = useState(false);
  const initialFilterStatus = useSelector((state) => state.todo.filterStatus);
  const [filterStatus, setFilterStatus] = useState(initialFilterStatus);
  const dispatch = useDispatch();

  const updateFilter = (e) => {
    setFilterStatus(e.target.value);
    dispatch(updateFilterStatus(e.target.value));
  };


  const updateSort = (e) => {
    const [sortBy, sortOrder] = e.target.value.split('-');
    dispatch(setSortCriteria({ sortBy, sortOrder }));
  };

  const addopt = {
    loop: true,
    autoplay: true,
    animationData: add,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div className={styles.appHeader}>

      <Button variant="primary" onClick={() => setModalOpen(true)}>
        Add Task +

      </Button>
      <SelectButton
        id="status"

        onChange={(e) => updateFilter(e)}
        value={filterStatus}

      >
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Completed</option>
      </SelectButton>

      {/* Add sorting dropdown */}
      <SelectButton
        id="sort"

        onChange={(e) => updateSort(e)}
        value={`${useSelector((state) => state.todo.sortBy)
          }-${useSelector((state) => state.todo.sortOrder)
          }`}
      >
        <option value="dueDate-asc">Sort by Due Date (Ascending)</option>
        <option value="dueDate-desc">Sort by Due Date (Descending)</option>
        <option value="priority-asc">Sort by Priority (Ascending)</option>
        <option value="priority-desc">Sort by Priority (Descending)</option>
      </SelectButton>

      <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div >
  );
}

export default AppHeader;










