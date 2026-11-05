import React from 'react';
import { LEVELS, POINTS, formatScore } from '../data';
import AnswerButton from './AnswerButton';

const QuestionCard = ({ question, currentIndex, total, status, selectedIndex, hiddenOptions = [], onSelectAnswer }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
      <h3 style={{ marginTop: 0 }}>
        Câu {currentIndex + 1}/{total} - Mức độ {LEVELS[question.level]} - {formatScore(POINTS[question.level])}
      </h3>
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{question.question}</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '15px' }}>
        {question.options.map((opt, idx) => (
          <AnswerButton
            key={idx}
            index={idx}
            option={opt}
            status={status}
            selectedIndex={selectedIndex}
            correctIndex={question.answer}
            isHidden={hiddenOptions.includes(idx)}
            onClick={onSelectAnswer}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;