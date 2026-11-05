import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LEVELS, POINTS, formatScore } from '../data';

const QuestionBank = ({ questions }) => {
  const [levelFilter, setLevelFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredQuestions = questions.filter((q) => {
    const matchLevel = levelFilter === 'ALL' || q.level === Number(levelFilter);
    const matchSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase());
    return matchLevel && matchSearch;
  });

  const handleRandom = () => {
    if (filteredQuestions.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    const randomQ = filteredQuestions[randomIndex];
    navigate(`/questions/${randomQ.id}`);
  };

  return (
    <div>
      <h2>Ngân hàng câu hỏi</h2>
      <div style={{ marginBottom: '15px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
          <option value="ALL">Tất cả</option>
          <option value="1">Dễ</option>
          <option value="2">Trung bình</option>
          <option value="3">Khó</option>
        </select>

        <input
          type="text"
          placeholder="Tìm kiếm nội dung câu hỏi..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button onClick={handleRandom} disabled={filteredQuestions.length === 0}>
          Câu ngẫu nhiên
        </button>
      </div>

      <p>Có {filteredQuestions.length} câu hỏi</p>

      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>STT</th>
            <th>Mức độ</th>
            <th>Điểm</th>
            <th>Câu hỏi</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((q, idx) => (
            <tr key={q.id}>
              <td style={{ textAlign: 'center' }}>{idx + 1}</td>
              <td style={{ textAlign: 'center' }}>{LEVELS[q.level]}</td>
              <td style={{ textAlign: 'center' }}>{formatScore(POINTS[q.level])}</td>
              <td>
                <Link to={`/questions/${q.id}`}>{q.question}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionBank;