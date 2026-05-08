import React, { useState } from 'react';
import Dashboard from './components/Dashboard.jsx';
import MatrixCreator from './components/MatrixCreator.jsx';
import MatrixEditor from './components/MatrixEditor.jsx';
import { saveMatrix, loadMatrices, deleteMatrix } from './hooks/useMatrix';

import './App.css';

function App() {
  const [matrices, setMatrices] = useState(loadMatrices());
  const [currentView, setCurrentView] = useState('dashboard');
  const [editingMatrix, setEditingMatrix] = useState(null);

  const handleCreateMatrix = (matrixData) => {
    const newMatrix = {
      id: Date.now(),
      ...matrixData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setMatrices([...matrices, newMatrix]);
    saveMatrix(newMatrix);
    setCurrentView('dashboard');
  };

  const handleUpdateMatrix = (updatedData) => {
    const updatedMatrices = matrices.map(matrix => 
      matrix.id === editingMatrix.id ? { ...matrix, ...updatedData, updatedAt: new Date().toISOString() } : matrix
    );
    setMatrices(updatedMatrices);
    saveMatrix(updatedMatrices.find(m => m.id === editingMatrix.id));
    setEditingMatrix(null);
    setCurrentView('dashboard');
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this decision matrix?')) {
      const updated = matrices.filter(m => m.id !== id);
      setMatrices(updated);
      deleteMatrix(id);
      if (editingMatrix?.id === id) {
        setEditingMatrix(null);
        setCurrentView('dashboard');
      }
    }
  };

  const startEdit = (matrixId) => {
    const matrix = matrices.find(m => m.id === matrixId);
    setEditingMatrix(matrix);
    setCurrentView('editor');
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📊 Decision Matrix Builder</h1>
        <p>Make better decisions with structured analysis</p>
      </header>

      <main className="app-main">
        {currentView === 'dashboard' && (
          <Dashboard 
            matrices={matrices}
            onCreate={() => setCurrentView('creator')}
            onEdit={startEdit}
            onDelete={handleDelete}
          />
        )}

        {currentView === 'creator' && (
          <MatrixCreator 
            onSave={handleCreateMatrix}
            onCancel={() => setCurrentView('dashboard')}
          />
        )}

        {currentView === 'editor' && editingMatrix && (
          <MatrixEditor 
            matrix={editingMatrix}
            onSave={handleUpdateMatrix}
            onCancel={() => {
              setEditingMatrix(null);
              setCurrentView('dashboard');
            }}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Built with React & Tailwind CSS | All data stored locally in your browser</p>
      </footer>
    </div>
  );
}

export default App;