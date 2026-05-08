const MatrixCard = ({ matrix, onEdit, onDelete }) => {
  const getCreatedAt = () => {
    if (!matrix.createdAt) return '';
    const date = new Date(matrix.createdAt);
    return date.toLocaleDateString();
  };

  const getTotalWeight = () => {
    const total = matrix.criteria.reduce((sum, c) => sum + c.weight, 0);
    return total.toFixed(2);
  };

  const getScoreCount = () => {
    if (!matrix.scores) return 0;
    const optionCount = matrix.options.length;
    const criterionCount = matrix.criteria.length;
    return optionCount * criterionCount;
  };

  return (
    <div className="matrix-card">
      <h3>{matrix.title}</h3>
      <p>{matrix.description || 'No description provided'}</p>
      <div className="matrix-card-stats">
        <span>Options: {matrix.options.length}</span>
        <span>Criteria: {matrix.criteria.length}</span>
        <span>Weight: {getTotalWeight()}</span>
        <span>Created: {getCreatedAt()}</span>
      </div>
      <div className="matrix-card-actions">
        <button className="btn-primary" onClick={onEdit}>
          Edit
        </button>
        <button className="btn-secondary" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default MatrixCard;