import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatScore } from '../data';

const Home = ({ playerName, setPlayerName, history = [] }) => {
  const navigate = useNavigate();
  const topRecord = history.length > 0
    ? [...history].sort((a, b) => b.score - a.score)[0]
    : null;

  const handleStart = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      navigate('/play');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '20px' }}>
      <h2>Thử thách 3 mạng</h2>

      {topRecord && (
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#6f42c1', marginBottom: '15px' }}>
          Kỷ lục: {formatScore(topRecord.score)} – {topRecord.name}
        </div>
      )}

      <div style={{ textAlign: 'left', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h4>Luật chơi:</h4>
        <ul>
          <li>Bạn có 3 mạng và 90 giây cho cả lượt chơi để trả lời 15 câu hỏi.</li>
          <li>Trả lời đúng được cộng điểm, từ câu đúng thứ 3 liên tiếp được thưởng thêm điểm.</li>
          <li>Trả lời sai mất 1 mạng, chuỗi đúng trở về 0 nhưng vẫn đi tiếp.</li>
          <li>Lượt chơi kết thúc khi hết câu hỏi, hết mạng hoặc hết giờ.</li>
        </ul>
      </div>

      <form onSubmit={handleStart}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Nhập tên người chơi..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            style={{ padding: '10px', width: '250px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <button
          type="submit"
          disabled={!playerName.trim()}
          style={{ padding: '10px 24px', fontSize: '16px', cursor: playerName.trim() ? 'pointer' : 'not-allowed', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}
        >
          Bắt đầu
        </button>
      </form>
    </div>
  );
};

export default Home;