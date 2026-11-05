import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { LEVELS, POINTS, LETTERS, formatScore } from '../data';

const QuestionDetail = ({ questions }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = Number(id);

  const question = questions.find((q) => q.id === numericId);

  if (!question) {
    return <h2>Không tìm thấy câu hỏi</h2>;
  }

  const prevQuestion = questions.find((q) => q.id === numericId - 1);
  const nextQuestion = questions.find((q) => q.id === numericId + 1);

  return (
    <div>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '15px' }}>
        Quay lại
      </button>

      <h3>
        Câu hỏi số {question.id} ({LEVELS[question.level]} - {formatScore(POINTS[question.level])})
      </h3>
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{question.question}</p>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {question.options.map((option, idx) => {
          const isCorrect = idx === question.answer;
          return (
            <li
              key={idx}
              style={{
                padding: '10px',
                margin: '5px 0',
                borderRadius: '4px',
                border: '1px solid #ddd',
                backgroundColor: isCorrect ? '#d4edda' : '#ffffff',
                color: isCorrect ? '#155724' : '#000000',
                fontWeight: isCorrect ? 'bold' : 'normal'
              }}
            >
              {LETTERS[idx]}. {option} {isCorrect && '(Đáp án đúng)'}
            </li>
          );
        })}
      </ul>

      <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
        {prevQuestion && (
            <Link to={`/questions/${prevQuestion.id}`}>← Câu trước</Link>
        )}
        {nextQuestion && (
            <Link to={`/questions/${nextQuestion.id}`}>Câu sau →</Link>
        )}
        </div>
    </div>
  );
};

export default QuestionDetail;