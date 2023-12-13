import React from 'react';
import Task from './Task';
import PropTypes from 'prop-types';
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';


const TaskList = ({ list }) => {
  const { id } = useParams();
  // Utilisation de listId pour accéder à la valeur spécifique du localStorage
  const [counter, setCounter] = useState(localStorage.getItem(`counter_${id}`) ? parseInt(localStorage.getItem(`counter_${id}`)) : 0);

  const handleTaskCheck = (isChecked) => {
    setCounter(prevCount => {
      const newCount = isChecked ? prevCount + 1 : prevCount - 1;
      // Mise à jour du localStorage avec la clé spécifique
      localStorage.setItem(`counter_${id}`, newCount); 
      return newCount;
    });
  };

  useEffect(() => {
    const storedCounter = localStorage.getItem(`counter_${id}`);
    if (storedCounter) {
      setCounter(parseInt(storedCounter));
    }
  }, [id]); // Dépendance au id

  return (
    <>
      <div>
        <p> Checked Tasks: {counter}/{list.length}</p>
          
        {list.map((task, ) => (
          <Task key={task.id} task={task.title} onCheck={handleTaskCheck}   />
        ))}
      </div>
    </>
   
  );
}

TaskList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
  })).isRequired
};

export default TaskList;