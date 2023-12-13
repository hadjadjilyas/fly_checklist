import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';
import { addChecklist,prepareChecklistData } from './API/Fonctions';


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

// Apply styles for smaller screens
const ResponsiveFormContainer = styled(FormContainer)`
  ${media.small} {
    width: 60%;
    margin: auto;
    margin-top: 25%;
    
  }
`;

// Css Responsive
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

const ChecklistForm = ({ updateData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todo, setTasks] = useState([]);
  const [nextId, setNextId] = useState(2);
  const navigate = useNavigate();

  const handleTaskNameChange = (index, e) => {
    const newTasks = [...todo];
    newTasks[index].name = e.target.value;
    setTasks(newTasks);
  };

  const handleAddTask = () => {
    setTasks([...todo, { id: uniqid.time(), name: '',}]);
    console.log('id',id);

  };

  const handleRemoveTask = (index) => {
    const newTasks = [...todo];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleSave = async () => {
    try {
      console.log("Current state before sending:", {
        title,
        description,
        todo,
      });
      const checklistData = prepareChecklistData(title, description, todo);
      console.log("ChecklistData to be sent:", checklistData); // log de verification
      const response = await addChecklist(title, description, todo);
      console.log("Checklist ajoutée avec succès:", response);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la checklist:", error);
    }
  
    navigate('/');
    
  };

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
              value={task.name}
              onChange={(e) => handleTaskNameChange(index, e)}
              placeholder={`Task ${index + 1}`}
            />
            <DeleteButton onClick={() => handleRemoveTask(index)}>
              &#128465;
            </DeleteButton>
          </Task>
        ))}
      </TaskList>
      <ResponsiveAddTask onClick={handleAddTask}>+ Add task</ResponsiveAddTask>
      <ResponsiveSaveButton onClick={handleSave}>Save</ResponsiveSaveButton>
    </ResponsiveFormContainer>
  );
};

export default ChecklistForm;
