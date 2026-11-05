import React from 'react';

const ProgressBar = ({ total, currentIndex, results }) => {
  return (
    <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
      {Array.from({ length: total }).map((_, idx) => {
        let bgColor = '#e0e0e0';
        let textColor = '#333';
        const isCurrent = idx === currentIndex;

        if (results[idx] === 'correct') {
          bgColor = '#28a745';
          textColor = '#fff';
        } else if (results[idx] === 'wrong') {
          bgColor = '#dc3545';
          textColor = '#fff';
        } else if (results[idx] === 'skipped') {
          bgColor = '#ff9800';
          textColor = '#fff';
        }

        return (
          <div
            key={idx}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '8px 0',
              backgroundColor: bgColor,
              color: textColor,
              fontWeight: isCurrent ? 'bold' : 'normal',
              border: isCurrent ? '3px solid #007bff' : '1px solid #ccc',
              borderRadius: '4px'
            }}
          >
            {idx + 1}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;