import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Header from './Header';
import CardList from './CardList';
import TaskContainer from './TaskContainer';
import ChecklistForm from './Formulaire';
import ChecklistFormEdit from './FormuliareEdit';


function App() {
 

  
  

  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route
            path="/checklist-form"
            element={<ChecklistForm  />}
          />
          <Route
            path="/"
            element={<CardList  />}
          />
          <Route
            path="/task/:id"
            element={<TaskContainer  />}
          />
          <Route
            path="/form/:id"
            element={<ChecklistFormEdit />}
          />

        </Routes>
      </>
    </Router>
  );
}

export default App;
