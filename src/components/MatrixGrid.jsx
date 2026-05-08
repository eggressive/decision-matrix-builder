import React from 'react';
import ScoringCell from './ScoringCell.jsx';

const MatrixGrid = ({ options, criteria, getScore, onUpdateScore, selectedCell, onSelectCell }) => {
  return (
    <div className="matrix-grid">
      <table>
        <thead>
          <tr>
            <th className="corner-cell"></th>
            {criteria.map(criterion => (
              <th key={criterion.id} className="criterion-header">
                <div className="criterion-label">
                  {criterion.title}
                  <div className="weight-badge">W:{criterion.weight}</div>
                </div>
              </th>
            ))}
            <th className="total-header">Total</th>
          </tr>
        </thead>
        <tbody>
          {options.map(option => (
            <tr key={option.id}>
              <td className="option-label">{option.title}</td>
              {criteria.map(criterion => (
                <td key={criterion.id} className="scoring-cell">
                  <ScoringCell
                    value={getScore(option.id, criterion.id)}
                    onChange={(score) => onUpdateScore(option.id, criterion.id, score)}
                    selected={selectedCell === `${option.id}-${criterion.id}`}
                    onSelect={() => onSelectCell(`${option.id}-${criterion.id}`)}
                  />
                </td>
              ))}
              <td className="total-score">
                {options
                  .map(opt => ({
                    ...opt,
                    score: options
                      .flatMap(opt => criteria.map(crit => ({
                        optionId: opt.id,
                        criterionId: crit.id,
                        score: getScore(opt.id, crit.id) * crit.weight
                      })))
                      .filter(s => s.optionId === option.id)
                      .reduce((sum, s) => sum + s.score, 0)
                  }))
                  .find(opt => opt.id === option.id)?.score?.toFixed(2) || '0.00'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatrixGrid;