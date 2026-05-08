import { useState } from 'react';

export const loadMatrices = () => {
  try {
    const saved = localStorage.getItem('decisionMatrices');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error('Failed to load matrices:', e);
    return [];
  }
};

export const saveMatrix = (matrix) => {
  const matrices = loadMatrices();
  const existingIndex = matrices.findIndex(m => m.id === matrix.id);
  if (existingIndex >= 0) {
    matrices[existingIndex] = matrix;
  } else {
    matrices.push(matrix);
  }
  localStorage.setItem('decisionMatrices', JSON.stringify(matrices));
};

export const deleteMatrix = (id) => {
  const matrices = loadMatrices().filter(m => m.id !== id);
  localStorage.setItem('decisionMatrices', JSON.stringify(matrices));
};

export const useMatrix = (initialMatrices = []) => {
  const [matrices, setMatrices] = useState(() => {
    const saved = loadMatrices();
    return saved.length > 0 ? saved : initialMatrices;
  });

  const addMatrix = (matrix) => {
    const newMatrix = {
      id: Date.now(),
      ...matrix,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setMatrices([...matrices, newMatrix]);
    saveMatrix(newMatrix);
  };

  const updateMatrix = (id, updates) => {
    const updated = matrices.map(m => 
      m.id === id ? { ...m, ...updates, updatedAt: new Date().toISOString() } : m
    );
    setMatrices(updated);
    saveMatrix(updated.find(m => m.id === id));
  };

  const removeMatrix = (id) => {
    const updated = matrices.filter(m => m.id !== id);
    setMatrices(updated);
    deleteMatrix(id);
  };

  return {
    matrices,
    addMatrix,
    updateMatrix,
    removeMatrix
  };
};