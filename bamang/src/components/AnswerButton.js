import React from 'react';
import { LETTERS } from '../data';

const AnswerButton = ({ index, option, status, selectedIndex, correctIndex, isHidden, onClick }) => {
  if (isHidden) {
    return (
      <button
        disabled
        style={{
          padding: '16px',
          backgroundColor: '#f8f9fa',
          border: '1px dashed #ccc',
          borderRadius: '6px',
          visibility: 'visible',
          opacity: 0.3,
          cursor: 'not-allowed'
        }}
      >
        {LETTERS[index]}.
      </button>
    );
  }

  let bgColor = '#ffffff';
  let textColor = '#000000';

  if (status === 'locked' && selectedIndex === index) {
    bgColor = '#ffc107';
  } else if (status === 'revealed') {
    if (index === correctIndex) {
      bgColor = '#28a745';
      textColor = '#ffffff';
    } else if (selectedIndex === index) {
      bgColor = '#dc3545';
      textColor = '#ffffff';
    }
  }

  return (
    <button
      onClick={() => onClick(index)}
      disabled={status !== 'answering'}
      style={{
        padding: '16px',
        fontSize: '16px',
        cursor: status === 'answering' ? 'pointer' : 'default',
        backgroundColor: bgColor,
        color: textColor,
        border: '2px solid #ccc',
        borderRadius: '6px',
        textAlign: 'left',
        fontWeight: 'bold',
        transition: 'all 0.2s'
      }}
    >
      {LETTERS[index]}. {option}
    </button>
  );
};

export default AnswerButton;