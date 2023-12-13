import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TaskList from "./TaskList";
import { PropTypes } from 'prop-types';
import { useParams } from 'react-router-dom';
import { getTasksByChecklistId } from "./API/Fonctions";

const TaskContainer = () => {
  const { id } = useParams();
  const [checklist, setChecklist] = useState({
    title: "",
    description: "",
    todo: [],
    statut: 0,
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiResponse = await getTasksByChecklistId(id);
        console.log("API Response:", apiResponse);

        

        // Mettez à jour l'état en incluant le titre, la description et les tâches
        setChecklist({
          title: apiResponse.title || "",
          description: apiResponse.description || "",
          todo: apiResponse.todo || [],
          statut: apiResponse.statut,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des tâches :", error);
      }
    };

    fetchData();
  }, [id]);

  const Container = styled.div`
    background-color: #ffcf33;
    width: 500px;
    margin: 50px auto;
    padding: 30px;
    border-radius: 10px;
    height: 500px;
    h1, p {
      color: #000;
      margin: 0 0 20px 0;
    }  
  `;

  const mediaQuery = '768px';

  const media = {
    small: `@media (max-width: ${mediaQuery})`,
  };
  
  const ResponsiveContainer = styled(Container)`
    ${media.small} {
      width: 60%;
      
    }
  `;

  return (
    <ResponsiveContainer>
      <h1>{checklist.title}</h1>
      <p>{checklist.description}</p>
      <TaskList list={checklist.todo}   /> 
    </ResponsiveContainer>
  );
};

TaskContainer.propTypes = {
  id: PropTypes.string.isRequired,
};

export default TaskContainer;
