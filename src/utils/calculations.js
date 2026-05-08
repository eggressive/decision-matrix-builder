export const calculateWeightedScore = (scores, criteria) => {
  return scores.reduce((sum, score) => {
    const criterion = criteria.find(c => c.id === score.criterionId);
    return sum + (score.score * criterion.weight);
  }, 0);
};

export const calculateAllScores = (matrix) => {
  return matrix.options.map(option => ({
    ...option,
    totalScore: calculateWeightedScore(
      matrix.scores.filter(s => s.optionId === option.id),
      matrix.criteria
    ).toFixed(2)
  }));
};

export const rankOptions = (matrix) => {
  const scored = calculateAllScores(matrix);
  return [...scored]
    .sort((a, b) => b.totalScore - a.totalScore)
    .map((option, index) => ({ ...option, rank: index + 1 }));
};

export const validateMatrix = (matrix) => {
  const errors = [];
  
  if (matrix.options.length < 2) {
    errors.push('At least 2 options required');
  }
  
  if (matrix.criteria.length < 2) {
    errors.push('At least 2 criteria required');
  }
  
  const totalWeight = matrix.criteria.reduce((sum, c) => sum + c.weight, 0);
  if (Math.abs(totalWeight - 1) > 0.01) {
    errors.push('Criterion weights must sum to 1');
  }
  
  matrix.scores.forEach(score => {
    if (score.score < 1 || score.score > 10) {
      errors.push(`Score for option ${score.optionId} on criterion ${score.criterionId} must be between 1-10`);
    }
  });
  
  return errors;
};