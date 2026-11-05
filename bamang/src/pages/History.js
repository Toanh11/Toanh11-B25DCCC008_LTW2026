import React from 'react';
import { formatScore } from '../data';

const History = ({ history = [], onClearHistory }) => {
  if (history.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <h2>Lịch sử các lượt chơi</h2>
        <p>Chưa có lượt chơi nào</p>
      </div>
    );
  }

  const sortedHistory = [...history].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.livesLeft - a.livesLeft;
  });

  const totalPlays = history.length;
  const highestScore = Math.max(...history.map((h) => h.score));
  const totalCorrect = history.reduce((sum, h) => sum + h.correctCount, 0);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>Lịch sử các lượt chơi</h2>

      <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '6px', marginBottom: '20px', lineHeight: '1.6' }}>
        <p><strong>Số lượt chơi:</strong> {totalPlays}</p>
        <p><strong>Điểm cao nhất:</strong> {formatScore(highestScore)}</p>
        <p><strong>Tổng số câu trả lời đúng:</strong> {totalCorrect}</p>
        <button
          onClick={onClearHistory}
          style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '5px' }}
        >
          Xóa lịch sử
        </button>
      </div>

      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>STT</th>
            <th>Người chơi</th>
            <th>Số câu đúng</th>
            <th>Mạng còn lại</th>
            <th>Điểm</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {sortedHistory.map((item, idx) => (
            <tr key={item.id || idx}>
              <td style={{ textAlign: 'center' }}>{idx + 1}</td>
              <td>{item.name}</td>
              <td style={{ textAlign: 'center' }}>{item.correctCount}/15</td>
              <td style={{ textAlign: 'center' }}>{item.livesLeft}</td>
              <td style={{ textAlign: 'center' }}>{formatScore(item.score)}</td>
              <td style={{ textAlign: 'center' }}>{item.playedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;