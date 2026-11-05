import React from 'react';
import { formatScore } from '../data';

const StatusBar = ({ timeLeft, lives, score, streak }) => {
  const isTimeWarning = timeLeft <= 15;

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 20px', backgroundColor: '#e9ecef', borderRadius: '6px', marginBottom: '20px' }}>
      <div style={{ color: isTimeWarning ? 'red' : 'black', fontWeight: 'bold' }}>
        Thời gian: {timeLeft} giây
      </div>
      <div>
        Mạng: {Array.from({ length: lives }).map((_, i) => '❤️ ')} ({lives})
      </div>
      <div>
        Điểm: {formatScore(score)}
      </div>
      <div>
        Chuỗi đúng: {streak}
      </div>
    </div>
  );
};

export default StatusBar;