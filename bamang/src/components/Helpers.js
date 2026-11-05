import React from 'react';
import { MAX_LIVES } from '../data';

const Helpers = ({ status, lives, usedHelpers, onUse5050, onUseSkip, onUseAddLife }) => {
  const isAnswering = status === 'answering';

  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
      <button
        onClick={onUse5050}
        disabled={!isAnswering || usedHelpers.h5050}
        style={{ padding: '8px 16px', fontWeight: 'bold', cursor: isAnswering && !usedHelpers.h5050 ? 'pointer' : 'not-allowed' }}
      >
        50:50
      </button>

      <button
        onClick={onUseSkip}
        disabled={!isAnswering || usedHelpers.skip}
        style={{ padding: '8px 16px', fontWeight: 'bold', cursor: isAnswering && !usedHelpers.skip ? 'pointer' : 'not-allowed' }}
      >
        Bỏ qua
      </button>

      <button
        onClick={onUseAddLife}
        disabled={!isAnswering || usedHelpers.addLife || lives >= MAX_LIVES}
        style={{ padding: '8px 16px', fontWeight: 'bold', cursor: isAnswering && !usedHelpers.addLife && lives < MAX_LIVES ? 'pointer' : 'not-allowed' }}
      >
        Thêm 1 mạng
      </button>
    </div>
  );
};

export default Helpers;