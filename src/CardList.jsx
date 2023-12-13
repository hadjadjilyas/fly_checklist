  import styled from "styled-components";
  import CardCheck from "./CardCheck";
  import { useState, useEffect } from "react";
  import { getChecklists } from "./API/Fonctions";



  const CardList = ({counter}) => {
    const [checklistsData, setChecklistsData] = useState([]);

    useEffect(() => {
      // Chargement des checklists depuis l'API 
      const fetchChecklists = async () => {
        try {
          const checklists = await getChecklists();
          console.log('checklist',checklists); 

          setChecklistsData(checklists);
        } catch (error) {
          console.error("Error fetching checklists:", error);
        }
      };

      fetchChecklists();
    }, []);
    
    return (
      <>
        <A href="http://localhost:5173/checklist-form" className="add-checklist">+ Add Checklist</A>
        <GridDiv>
        {checklistsData.map((checklist) => (
          <CardCheck  
              key={checklist.id}
              id={checklist.id}
              title={checklist.title}
              description={checklist.description}
              todo={checklist.todo}
              counter={counter} />        
            ))}
        </GridDiv>
      </>
        );
      }


  const GridDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 100px;
    padding: 35px;
  `;

  const A = styled.a`
    background-color: #EF476F;
    color: white;
    padding: 15px 30px;
    border-radius: 30px;
    text-align: center;
    font-size: 18px;
    margin-top: 30px;
    display: block;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
    text-decoration: none;  
  `;

  export default CardList;
