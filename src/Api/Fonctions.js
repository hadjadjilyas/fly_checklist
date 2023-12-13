import api from "./api";

export const prepareChecklistData = (title, description, tasks) => {
  return {
    
    title,
    description,
    todo: tasks
      ? tasks.map((task) => ({
          title: task || "", 
          description: description || "",
        }))
      : [],
  };
};

// Fonction pour ajouter une checklist
export const addChecklist = async (title, description, todo) => {
  const checklistData = prepareChecklistData(title, description, todo);

  try {
    const response = await api.post("/checklist/add", checklistData);
    return response.data;
  } catch (error) {
    console.error("Error adding checklist:", error);
    throw error;
  }
};

// Fonction pour récupérer toutes les checklists
export const getChecklists = async () => {
  try {
    const response = await api.get("/checklists");
    return response.data.response; // Extraire la propriété response
  } catch (error) {
    console.error("Error getting checklists:", error);
    throw error;
  }
};

// Fonction pour récupérer les tâches par ID de checklist
export const getTasksByChecklistId = async (checklistId) => {
  try {
    const response = await api.get(`/checklist?id=${checklistId}`);
    return response.data; // Assurez-vous de Respecter La structure De L'API
  } catch (error) {
    console.error("Error getting tasks:", error);
    throw error;
  }
};

// Fonction pour supprimer
export const deleteChecklist = async (checklistId) => {
  try {
    const response = await api.get(`/checklist/delete?id=${checklistId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur deleting checklist :", error);
    throw error;
  }
};

export const prepareChecklist = (id,title, description, tasks,statut) => {
  return {
    id,
    title,
    description,
    todo: tasks
      ? tasks.map((task) => ({
          title: task || "", // Ajoutez une propriété title
          description: description || "",
          statut: task.statut || 0,
        }))
      : [],
  };
};



export const updateChecklist = async (id, title, description, tasks,statut) => {
  const checklistData = prepareChecklist(id,title, description, tasks,statut);
 
  


  try {
    const response = await api.post(
      `/checklist/update?id=${id}`,
      checklistData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating checklist:", error);
    throw error;
  }
};




export const statutChecklist = async (id) => {
  try {
    const response = await api.get(`/checklist/statut?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur deleting checklist :", error);
    throw error;
  }
};

