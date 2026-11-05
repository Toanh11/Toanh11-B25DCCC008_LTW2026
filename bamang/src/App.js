import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import QuestionBank from './pages/QuestionBank';
import QuestionDetail from './pages/QuestionDetail';
import NotFound from './pages/NotFound';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);

    axios.get('/data/questions.json', { signal: controller.signal })
      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return; 
        setError(true);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  if (loading) return <div style={{ padding: '20px' }}>Đang tải câu hỏi...</div>;
  if (error) return <div style={{ padding: '20px' }}>Không tải được câu hỏi</div>;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<h2>Trang chủ</h2>} />
        <Route path="play" element={<h2>Màn hình chơi</h2>} />
        <Route path="result" element={<h2>Kết quả lượt chơi</h2>} />
        <Route path="history" element={<h2>Lịch sử các lượt chơi</h2>} />
        <Route path="questions" element={<QuestionBank questions={questions} />} />
        <Route path="questions/:id" element={<QuestionDetail questions={questions} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;