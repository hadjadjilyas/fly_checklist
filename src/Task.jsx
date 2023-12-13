import styled from "styled-components";
import { useState, useEffect } from "react";
import { PropTypes } from 'prop-types';




const Task = ({ task, onCheck }) => {   
    const localStorageKey = `task_${task.id}_status`;
    const initialStatus = localStorage.getItem(localStorageKey) === '1';
    const [isChecked, setIsChecked] = useState(initialStatus);

    useEffect(() => {
        localStorage.setItem(localStorageKey, isChecked ? '1' : '0');
        task.statut = isChecked ? 1 : 0;
        console.log(`Statut de la tâche ${task.name} mis à jour : ${task.statut}`);
    }, [isChecked]);

    const toggleCheck = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        onCheck(newCheckedState); // Informer TaskList du changement0
    };

        const Ul = styled.ul`
            list-style: none; /* pas de puces */
            padding: 0;

            li{
                background-color: #fff; /* arrière-plan blanc pour les tâches */
                margin-bottom: 10px; /* espace entre les tâches */
                line-height: 40px; /* hauteur de ligne pour centrer le texte verticalement */
                padding-left: 40px; /* espace pour l'icône de coche */
                position: relative; 
                border-radius: 25px;
                
            }

            li.task::before {
            content: '';
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            border: 2px solid #ccc; // Cercle gris
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;

            }

            li.checked::before {
                content: '✓';
                position: absolute;
                left: 10px; /* ajustez selon vos besoins */
                top: 50%;
                transform: translateY(-50%); /* centrer la coche verticalement */
                color: green; /* couleur de la coche */

                
                border: 2px solid green; // Bordure du cercle
                border-radius: 50%; // Rend la forme circulaire
                width: 20px; // Largeur du cercle
                height: 20px; // Hauteur du cercle
                display: flex; // Permet le centrage du contenu
                justify-content: center; // Centre horizontalement dans le cercle
                align-items: center;

             }
            `;

    return ( 
        <>
        <Ul>
          <li className={isChecked ? 'checked' : 'task'} onClick={toggleCheck}>{task.name}</li>
         </Ul>
         </>  
     );
}

Task.propTypes = {
    task: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
    }).isRequired,
  };
 
export default Task;
