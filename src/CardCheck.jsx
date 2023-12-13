  import styled from "styled-components";
  import { PropTypes } from 'prop-types';
  import { useNavigate } from "react-router-dom";
  import { deleteChecklist } from "./API/Fonctions";
    

  const CardCheck = ({id,title, description, totalTasks, counter,todo}) => {

    const taille= todo.length;
      const navigate = useNavigate();

      const handleDeleteClick = async () => {
          const confirmed = window.confirm(
            "Êtes-vous sûr de bien vouloir supprimer cette Checklist ?"
          );
      
          if (confirmed) {
            try {
              const response = await deleteChecklist(id);
              if (response.done) {
                
                
                console.log("Checklist supprimée avec succès");
                window.location.reload();
              } else {
                console.log("La suppression de la checklist a échoué");
              }
            } catch (error) {
              console.error("Erreur lors de la suppression de la checklist :", error);
            }
          }
        
        };


    const handleClick = () => {
      navigate(`/task/${id}`);  // Redirection avec le id comme paramètre
    };
        
      console.log(`Rendering CardCheck with ID: ${id}`);

      const handleEdit =() =>{
          navigate(`/form/${id}`);
      }
      

      const getÉtat = () => {
          if (taille === 0) return 'null';
          return 'in progress';
      };

      const État = getÉtat(); 

      const CheckDiv = styled.div`
          width:300px;
          height:300px;
          background-color: #ffcf33;
          border-radius: 10px;
          align-items: center;

        // padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 20px;

          img{

        width: 20px;
        height: 20px;
        float: right;
        cursor: pointer;
      }

      & .checklist-footer {
            padding: 35px;
        text-align: center;
      }

      & .checklist-footer button {
        background-color: #EF476F; /* rouge-orange */
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 20px;
        cursor: pointer;
        width: 120px;
        height: 32px;
      }


        `;

        const DivInfo = styled.div`
            h3{
                justify-content: center;
                align-items: center;
                display: flex;
                padding: 15px;
            }
            h5{
                padding: 5px;
                margin-left:10px;
            }

            li{
                padding: 10px;
                margin: 10px;
                margin-left: 15px;
            }    
      `;
      
      return (        
          <CheckDiv >
              <img src="delete-svgrepo-com.svg"  alt="delete" onClick={handleDeleteClick}></img>
              <DivInfo onClick={handleClick}>
                  <h3>{title}</h3>
                  <h5>{description}</h5>
                  <li>Statut: {État}</li>
                  <li>Checked Tasks: {counter}</li>
                  <li>Number of Tasks: {todo.length} </li>                  
              </DivInfo>  
                <div className="checklist-footer">
                        <button onClick={handleEdit} >Edit</button>
                </div>
                  
          </CheckDiv>    
          
          
      );
  }

  CardCheck.propTypes={
      title: PropTypes.string,
      description: PropTypes.string,
      État: PropTypes.string,
      TachesAcc: PropTypes.number,
      Total: PropTypes.number,
      

    


  }
  
  export default CardCheck;