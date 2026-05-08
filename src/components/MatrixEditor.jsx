import React, { useState } from 'react';
import MatrixGrid from './MatrixGrid.jsx';
import ScoringCell from './ScoringCell.jsx';
import ExportButton from './ExportButton.jsx';

const MatrixEditor = ({ matrix, onSave, onCancel }) => {
  const [editedMatrix, setEditedMatrix] = useState(() => ({
    ...matrix,
    scores: matrix.scores || [],
    prosCons: matrix.prosCons || []
  }));
  const [selectedCell, setSelectedCell] = useState(null);

  const updateScore = (optionId, criterionId, score) => {
    const scores = editedMatrix.scores || [];
    const existingIndex = scores.findIndex(
      s => s.optionId === optionId && s.criterionId === criterionId
    );
    let updatedScores;
    if (existingIndex >= 0) {
      updatedScores = scores.map((s, i) =>
        i === existingIndex ? { ...s, score } : s
      );
    } else {
      updatedScores = [...scores, { optionId, criterionId, score }];
    }
    setEditedMatrix({
      ...editedMatrix,
      scores: updatedScores
    });
  };

  const handleSave = () => {
    // Recalculate total scores
    const updated = { ...editedMatrix };
    onSave(updated);
  };

  const calculateTotalScore = (optionId) => {
    const optionScores = editedMatrix.scores.filter(s => s.optionId === optionId);
    const total = optionScores.reduce((sum, s) => {
      const criterion = editedMatrix.criteria.find(c => c.id === s.criterionId);
      return sum + (s.score * criterion.weight);
    }, 0);
    return total.toFixed(2);
  };

  const getScore = (optionId, criterionId) => {
    const scoreObj = editedMatrix.scores.find(s => s.optionId === optionId && s.criterionId === criterionId);
    return scoreObj ? scoreObj.score : 0;
  };

  const addProCon = (optionId, type, content) => {
    const prosCons = editedMatrix.prosCons || [];
    const existing = prosCons.find(pc => pc.optionId === optionId && pc.type === type && pc.content === content);
    if (!existing) {
      setEditedMatrix({
        ...editedMatrix,
        prosCons: [...prosCons, { optionId, type, content, id: Date.now() }]
      });
    }
  };

  const removeProCon = (id) => {
    setEditedMatrix({
      ...editedMatrix,
      prosCons: editedMatrix.prosCons.filter(pc => pc.id !== id)
    });
  };

  return (
    <div className="matrix-editor">
      <div className="editor-header">
        <h2>{editedMatrix.title}</h2>
        <div className="editor-actions">
          <button className="btn-primary" onClick={handleSave}>Save Changes</button>
          <button className="btn-secondary" onClick={onCancel}>Cancel</button>
          <ExportButton matrix={editedMatrix} />
        </div>
      </div>

      <div className="editor-content">
        <div className="scoring-section">
          <h3>Scoring Matrix</h3>
          <MatrixGrid 
            options={editedMatrix.options}
            criteria={editedMatrix.criteria}
            getScore={getScore}
            onUpdateScore={updateScore}
            selectedCell={selectedCell}
            onSelectCell={setSelectedCell}
          />
        </div>

        <div className="pros-cons-section">
          <h3>Pros & Cons Analysis</h3>
          {editedMatrix.options.map(option => (
            <div key={option.id} className="option-pros-cons">
              <h4>{option.title}</h4>
              <div className="pros-cons-container">
                <div className="pros-cons-column">
                  <h5>Pros</h5>
                  <div className="pros-cons-list">
                    {(editedMatrix.prosCons || [])
                      .filter(pc => pc.optionId === option.id && pc.type === 'pro')
                      .map(pc => (
                        <div key={pc.id} className="pro-con-item">
                          <span>{pc.content}</span>
                          <button onClick={() => removeProCon(pc.id)}>×</button>
                        </div>
                      ))}
                  </div>
                  <div className="add-pro-con">
                    <input 
                      type="text"
                      placeholder="Add pro..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          addProCon(option.id, 'pro', e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="pros-cons-column">
                  <h5>Cons</h5>
                  <div className="pros-cons-list">
                    {(editedMatrix.prosCons || [])
                      .filter(pc => pc.optionId === option.id && pc.type === 'con')
                      .map(pc => (
                        <div key={pc.id} className="pro-con-item">
                          <span>{pc.content}</span>
                          <button onClick={() => removeProCon(pc.id)}>×</button>
                        </div>
                      ))}
                  </div>
                  <div className="add-pro-con">
                    <input 
                      type="text"
                      placeholder="Add con..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          addProCon(option.id, 'con', e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="editor-footer">
        <div className="results-summary">
          <h3>Results Summary</h3>
          <div className="results-grid">
            {editedMatrix.options.map(option => (
              <div key={option.id} className="result-item">
                <div className="result-title">{option.title}</div>
                <div className="result-score">{calculateTotalScore(option.id)}</div>
                <div className="result-rank">
                  {`#${editedMatrix.options
                    .map(opt => ({ 
                      ...opt, 
                      score: parseFloat(calculateTotalScore(opt.id)) 
                    }))
                    .sort((a, b) => b.score - a.score)
                    .findIndex(opt => opt.id === option.id) + 1}`
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatrixEditor;