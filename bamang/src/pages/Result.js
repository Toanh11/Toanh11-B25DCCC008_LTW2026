import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { formatScore } from '../data';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  if (!state) {
    return <Navigate to="/" replace />;
  }

  const { playerName, score, correctCount, livesLeft, reason } = state;

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', textAlign: 'center', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>{reason}</h2>
      
      <div style={{ textAlign: 'left', margin: '20px 0', fontSize: '18px', lineHeight: '1.8' }}>
        <p><strong>Người chơi:</strong> {playerName}</p>
        <p><strong>Số câu trả lời đúng:</strong> {correctCount}/15</p>
        <p><strong>Số mạng còn lại:</strong> {livesLeft}</p>
        <p><strong>Điểm:</strong> {formatScore(score)}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
        <button
          onClick={() => navigate('/play')}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px' }}
        >
          Chơi lại
        </button>
        <button
          onClick={() => navigate('/')}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px' }}
        >
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default Result;