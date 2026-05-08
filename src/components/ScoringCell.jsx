import React, { useState, useEffect } from 'react';

const ScoringCell = ({ value, onChange, selected, onSelect }) => {
  const [editing, setEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value ?? '');

  useEffect(() => {
    if (!editing) {
      setLocalValue(value ?? '');
    }
  }, [value, editing]);

  const handleClick = () => {
    onSelect();
    setEditing(true);
  };

  const handleBlur = () => {
    const num = parseFloat(localValue);
    if (!isNaN(num) && num >= 1 && num <= 10) {
      onChange(num);
    }
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  return (
    <div 
      className={`scoring-cell ${selected ? 'selected' : ''} ${editing ? 'editing' : ''}`}
      onClick={handleClick}
    >
      {editing ? (
        <input
          type="number"
          min="1"
          max="10"
          step="0.1"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        localValue || value || '0'
      )}
    </div>
  );
};

export default ScoringCell;