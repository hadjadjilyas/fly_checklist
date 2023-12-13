import React, { useState, useEffect,  } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';
import { updateChecklist, getTasksByChecklistId } from './API/Fonctions';
const FormContainer = styled.div`
  background-color: #ffcf33;
  padding: 20px;
  border-radius: 25px;
  width: 400px;
  margin: auto;
  margin-top: 120px;
`;

const StyledInput = styled.input`
  display: block;
  width: 50%;
  margin: auto 0;
  padding: 10px;
  border: none;
  border-radius: 15px;
`;

const StyledTextArea = styled.textarea`
  display: block;
  width: 80%;
  margin: 10px 0;
  padding: 10px;
  border: none;
  border-radius: 15px;
  resize: none;
`;

const TaskList = styled.div`
  margin-bottom: 10px;
`;

const Task = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const TaskInput = styled(StyledInput)`
  flex-grow: 1;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding-left: 10px;
  color: #010101;
`;

const AddButton = styled.button`
  background-color: #ef476f;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin-right: 100px;
  margin-top: 10px;
  margin-left: 150px;
`;

const SaveButton = styled(AddButton)`
  background-color: green;
  margin-left: 100px;
  width: 200px;
`;
const mediaQuery = '768px';

const media = {
  small: `@media (max-width: ${mediaQuery})`,
};

// Css Responsive
const ResponsiveFormContainer = styled(FormContainer)`
  ${media.small} {
    width: 60%;
    margin: auto;
    margin-top: 25%;
  }
`;
const ResponsiveSaveButton = styled(SaveButton)`
  ${media.small} {
    width: 100%;
    margin-left: 0;
  }
`;

const ResponsiveAddTask = styled(AddButton)`
  ${media.small} {
    width: 100%;
    margin-left: 0;
  }
`;

const ChecklistFormEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todo, setTasks] = useState([]);

  const handleTaskNameChange = (index, e) => {
    const newTasks = [...todo];
    newTasks[index].name = e.target.value;
    setTasks(newTasks);
  };

  const handleAddTask = () => {
    setTasks([...todo, { id: uniqid.time(), name: '',  }]);
  };

  const handleRemoveTask = (index) => {
    const newTasks = [...todo];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleSave = async () => {
    try {
      // Extract the individual properties from state
      const checklistData = {
        id,
        title,
        description,
        todo,
        
      };
  
      const response = await updateChecklist(id, title, description, todo);
      console.log("Sending data to API:", checklistData);
      console.log("Checklist updated successfully:", response);
      navigate('/'); 
    } catch (error) {
      console.error("Error during checklist update:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiResponse = await getTasksByChecklistId(id);
        setTitle(apiResponse.title || "");
        setDescription(apiResponse.description || "");

        setTasks(Array.isArray(apiResponse.todo) ? apiResponse.todo.map(task => ({
          id: task.title.id ||task.length +1 , 
          name: task.title.name, 
        })) : []);
      } catch (error) {
        console.error("Erreur lors de la récupération des tâches :", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <ResponsiveFormContainer>
      <StyledInput
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title Checklist"
      />
      <StyledTextArea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <TaskList>
        {todo.map((task, index) => (
          <Task key={task.id}>
            <TaskInput
              type="text"
              value={task.name} // Ici, 'name' représente 'title.name' de la tâche
              onChange={(e) => handleTaskNameChange(index, e)}
              placeholder={`Task ${index + 1}`}
            />
            <DeleteButton onClick={() => handleRemoveTask(index)}>
              &#128465;
            </DeleteButton>
          </Task>
        ))}
      </TaskList>
      <ResponsiveAddTask onClick={handleAddTask}>+ Add Task</ResponsiveAddTask>
      <ResponsiveSaveButton onClick={handleSave}>Save</ResponsiveSaveButton>
    </ResponsiveFormContainer>
  );
};

export default ChecklistFormEdit;
