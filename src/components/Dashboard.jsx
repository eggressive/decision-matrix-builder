import React from 'react';
import MatrixCard from './MatrixCard.jsx';

const Dashboard = ({ matrices, onCreate, onEdit, onDelete }) => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Your Decision Matrices</h2>
        <button 
          className="btn-primary"
          onClick={onCreate}
        >
          + New Decision Matrix
        </button>
      </div>

      {matrices.length === 0 ? (
        <div className="empty-state">
          <h3>No decision matrices yet</h3>
          <p>Create your first matrix to start analyzing your options.</p>
          <button 
            className="btn-secondary"
            onClick={onCreate}
          >
            Get Started
          </button>
        </div>
      ) : (
        <div className="matrix-grid">
          {matrices.map(matrix => (
            <MatrixCard
              key={matrix.id}
              matrix={matrix}
              onEdit={() => onEdit(matrix.id)}
              onDelete={() => onDelete(matrix.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;