import React, { useState } from 'react';

const MatrixCreator = ({ onSave, onCancel }) => {
  const [matrix, setMatrix] = useState({
    title: '',
    description: '',
    options: [],
    criteria: []
  });

  const [step, setStep] = useState(1);
  const [newOption, setNewOption] = useState('');
  const [newCriterion, setNewCriterion] = useState('');
  const [criterionWeight, setCriterionWeight] = useState('');

  const addOption = () => {
    if (newOption.trim()) {
      setMatrix({
        ...matrix,
        options: [...matrix.options, { id: Date.now(), title: newOption.trim() }]
      });
      setNewOption('');
    }
  };

  const addCriterion = () => {
    if (newCriterion.trim() && criterionWeight) {
      const weight = parseFloat(criterionWeight);
      if (weight > 0 && weight <= 1) {
        setMatrix({
          ...matrix,
          criteria: [...matrix.criteria, { 
            id: Date.now(), 
            title: newCriterion.trim(), 
            weight 
          }]
        });
        setNewCriterion('');
        setCriterionWeight('');
      }
    }
  };

  const removeOption = (id) => {
    setMatrix({
      ...matrix,
      options: matrix.options.filter(opt => opt.id !== id)
    });
  };

  const removeCriterion = (id) => {
    const remaining = matrix.criteria.filter(c => c.id !== id);
    const removedWeight = matrix.criteria.find(c => c.id === id)?.weight || 0;
    const scale = 1 - removedWeight;

    setMatrix({
      ...matrix,
      criteria: remaining.map(c => ({
        ...c,
        weight: scale > 0 ? parseFloat((c.weight / scale).toFixed(2)) : c.weight
      }))
    });
  };

  const validateAndSave = () => {
    if (matrix.options.length < 2) {
      alert('Please add at least 2 options');
      return;
    }
    if (matrix.criteria.length < 2) {
      alert('Please add at least 2 criteria');
      return;
    }
    const totalWeight = matrix.criteria.reduce((sum, c) => sum + c.weight, 0);
    if (Math.abs(totalWeight - 1) > 0.01) {
      alert('Criterion weights must sum to 1');
      return;
    }
    const matrixWithScores = {
      ...matrix,
      scores: matrix.options.flatMap(opt =>
        matrix.criteria.map(crit => ({
          optionId: opt.id,
          criterionId: crit.id,
          score: 0
        }))
      )
    };
    onSave(matrixWithScores);
  };

  const calculateTotalWeight = () => {
    return matrix.criteria.reduce((sum, c) => sum + c.weight, 0);
  };

  return (
    <div className="wizard">
      <div className="wizard-header">
        <h2>Create New Decision Matrix</h2>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(step/4)*100}%` }}></div>
        </div>
        <div className="step-indicators">
          <span className={`indicator ${step >= 1 ? 'active' : ''}`}>1</span>
          <span className={`indicator ${step >= 2 ? 'active' : ''}`}>2</span>
          <span className={`indicator ${step >= 3 ? 'active' : ''}`}>3</span>
          <span className={`indicator ${step >= 4 ? 'active' : ''}`}>4</span>
        </div>
      </div>

      <div className="wizard-content">
        {step === 1 && (
          <div className="step">
            <h3>Step 1: Basic Information</h3>
            <div className="form-group">
              <label>Decision Title*</label>
              <input
                type="text"
                value={matrix.title}
                onChange={(e) => setMatrix({...matrix, title: e.target.value})}
                placeholder="e.g., Which job offer to accept?"
                required
              />
            </div>
            <div className="form-group">
              <label>Description (optional)</label>
              <textarea
                value={matrix.description}
                onChange={(e) => setMatrix({...matrix, description: e.target.value})}
                placeholder="Provide context about this decision..."
              />
            </div>
            <div className="wizard-nav">
              <button className="btn-primary" onClick={() => setStep(2)}>Next: Add Options</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step">
            <h3>Step 2: Add Options (Alternatives)</h3>
            <p className="step-instructions">Enter at least 2 options to choose from:</p>
            
            <div className="list-editor">
              <div className="input-group">
                <input
                  type="text"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addOption()}
                  placeholder="Add new option..."
                />
                <button onClick={addOption}>Add</button>
              </div>
              
              <ul className="items-list">
                {matrix.options.map(option => (
                  <li key={option.id} className="list-item">
                    <span>{option.title}</span>
                    <button 
                      className="btn-small"
                      onClick={() => removeOption(option.id)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="wizard-nav">
              <button className="btn-secondary" onClick={() => setStep(1)}>Back</button>
              <button className="btn-primary" onClick={() => setStep(3)}>Next: Define Criteria</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step">
            <h3>Step 3: Define Criteria</h3>
            <p className="step-instructions">Enter evaluation criteria and their importance (weight):</p>
            
            <div className="list-editor">
              <div className="input-group">
                <input
                  type="text"
                  value={newCriterion}
                  onChange={(e) => setNewCriterion(e.target.value)}
                  placeholder="Add new criterion..."
                />
                <input
                  type="number"
                  min="0"
                  max="1"
                  step="0.01"
                  value={criterionWeight}
                  onChange={(e) => setCriterionWeight(e.target.value)}
                  placeholder="Weight (0-1)"
                  style={{ width: '100px' }}
                />
                <button onClick={addCriterion}>Add</button>
              </div>
              
              <ul className="items-list">
                {matrix.criteria.map(criterion => (
                  <li key={criterion.id} className="list-item">
                    <div className="list-item-content">
                      <span>{criterion.title}</span>
                      <span className="weight-badge">{criterion.weight}</span>
                    </div>
                    <button 
                      className="btn-small"
                      onClick={() => removeCriterion(criterion.id)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
                <li className="list-item total-weight">
                  <div className="list-item-content">
                    <strong>Total Weight:</strong>
                    <span>{calculateTotalWeight().toFixed(2)}</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="wizard-nav">
              <button className="btn-secondary" onClick={() => setStep(2)}>Back</button>
              <button className="btn-primary" onClick={() => setStep(4)}>Next: Review</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="step">
            <h3>Step 4: Review & Create</h3>
            <div className="review-summary">
              <h4>Decision Title</h4>
              <p>{matrix.title}</p>
              
              <h4>Options ({matrix.options.length})</h4>
              <ul>
                {matrix.options.map(opt => (
                  <li key={opt.id}>{opt.title}</li>
                ))}
              </ul>
              
              <h4>Criteria ({matrix.criteria.length})</h4>
              <ul>
                {matrix.criteria.map(crit => (
                  <li key={crit.id}>{crit.title} (Weight: {crit.weight})</li>
                ))}
              </ul>
              
              <div className="review-total-weight">
                <strong>Total Weight: {calculateTotalWeight().toFixed(2)}</strong>
              </div>
            </div>

            <div className="wizard-nav">
              <button className="btn-secondary" onClick={() => setStep(3)}>Back</button>
              <button className="btn-primary" onClick={validateAndSave}>Create Matrix</button>
              <button className="btn-secondary" onClick={onCancel}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatrixCreator;