import React from 'react';
import { saveAs } from 'file-saver';

const ExportButton = ({ matrix }) => {
  const escapeCSV = (value) => {
    const str = String(value ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const exportToCSV = () => {
    const headers = ['Option', ...matrix.criteria.map(c => c.title), 'Total Score'];
    const rows = matrix.options.map(option => {
      const scores = matrix.criteria.map(criterion => {
        const score = matrix.scores.find(s => s.optionId === option.id && s.criterionId === criterion.id);
        return score ? score.score : 0;
      });
      const total = scores.reduce((sum, score, i) => sum + (score * matrix.criteria[i].weight), 0);
      return [option.title, ...scores, total.toFixed(2)];
    });

    const csvContent = [
      headers.map(escapeCSV).join(','),
      ...rows.map(row => row.map(escapeCSV).join(',')),
      [],
      ['Pros & Cons'],
      ['Option', 'Type', 'Content'],
      ...matrix.options.flatMap(option => [
        ...(matrix.prosCons?.filter(pc => pc.optionId === option.id && pc.type === 'pro').map(pc =>
          [option.title, 'Pro', pc.content]
        ) || []),
        ...(matrix.prosCons?.filter(pc => pc.optionId === option.id && pc.type === 'con').map(pc =>
          [option.title, 'Con', pc.content]
        ) || [])
      ]).map(row => row.map(escapeCSV).join(','))
    ].join('\n');

    const blob = new Blob(['\ufeff', csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${matrix.title.replace(/\s+/g, '_')}_decision_matrix.csv`);
  };

  const exportToText = () => {
    // Simple text-based export for now
    const content = `
Decision Matrix Report
======================
Title: ${matrix.title}
Date: ${new Date().toLocaleString()}
    
OPTIONS:
${matrix.options.map((opt, i) => `  ${i+1}. ${opt.title}`).join('\n')}

CRITERIA:
${matrix.criteria.map(crit => `  • ${crit.title} (Weight: ${crit.weight})`).join('\n')}

SCORES:
${matrix.options.flatMap(option => [
  `\n${option.title}:`,
  ...matrix.criteria.map(criterion => {
    const score = matrix.scores.find(s => s.optionId === option.id && s.criterionId === criterion.id);
    return `  - ${criterion.title}: ${score ? score.score : 0} (Weighted: ${(score ? score.score * criterion.weight : 0).toFixed(2)})`;
  }),
  `  Total: ${matrix.options
    .map(opt => ({
      ...opt,
      score: matrix.criteria
        .map(crit => {
          const s = matrix.scores.find(s => s.optionId === opt.id && s.criterionId === crit.id);
          return (s ? s.score * crit.weight : 0);
        })
        .reduce((a, b) => a + b, 0)
    }))
    .find(opt => opt.id === option.id)?.score?.toFixed(2) || '0.00'}`
])}

PROS & CONS:
${matrix.options.flatMap(option => [
  `\n${option.title} - Pros:`,
  ...matrix.prosCons?.filter(pc => pc.optionId === option.id && pc.type === 'pro').map(pc => `  • ${pc.content}`) || [],
  `\n${option.title} - Cons:`,
  ...matrix.prosCons?.filter(pc => pc.optionId === option.id && pc.type === 'con').map(pc => `  • ${pc.content}`) || []
])}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    saveAs(blob, `${matrix.title.replace(/\s+/g, '_')}_decision_matrix.txt`);
  };

  return (
    <div className="export-button">
      <button className="btn-secondary" onClick={exportToCSV}>
        Export CSV
      </button>
      <button className="btn-secondary" onClick={exportToText}>
        Export Text
      </button>
    </div>
  );
};

export default ExportButton;