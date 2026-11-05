import React from 'react';
import { formatScore } from '../data';

const StatusBar = ({ timeLeft, lives, score, streak }) => {
  const isTimeWarning = timeLeft <= 15;

  return (
    <div style={{
      display: 'flex',
      justify: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '16px',
      padding: '14px 20px',
      backgroundColor: '#e3f2fd',
      border: '1px solid #90caf9',
      borderRadius: '8px',
      marginBottom: '16px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
    }}>
      <div style={{ color: isTimeWarning ? '#d32f2f' : '#1565c0', fontWeight: 'bold', fontSize: '16px' }}>
        Thời gian: {timeLeft} giây
      </div>
      <div style={{ fontSize: '16px', color: '#1565c0', fontWeight: '600' }}>
        Mạng: {Array.from({ length: lives }).map((_, i) => '❤️ ')} ({lives})
      </div>
      <div style={{ fontSize: '16px', color: '#1565c0', fontWeight: '600' }}>
        Điểm: {formatScore(score)}
      </div>
      <div style={{ fontSize: '16px', color: '#1565c0', fontWeight: '600' }}>
        Chuỗi đúng: {streak}
      </div>
    </div>
  );
};

export default StatusBar;