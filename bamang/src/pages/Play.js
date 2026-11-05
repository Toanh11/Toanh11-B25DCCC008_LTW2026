import React, { useState, useEffect, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import StatusBar from '../components/StatusBar';
import ProgressBar from '../components/ProgressBar';
import { TOTAL_TIME, MAX_LIVES } from '../data';
import { calcScore } from '../utils';

const Play = ({ questions, playerName }) => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [lives, setLives] = useState(MAX_LIVES);
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [status, setStatus] = useState('answering'); 

  const currentQ = questions[currentIndex];
  const { score, streak, correctCount } = calcScore(results, questions);

  const finishGame = useCallback((reason, finalScore, finalCorrect, finalLives) => {
    navigate('/result', {
      replace: true,
      state: {
        playerName,
        score: finalScore,
        correctCount: finalCorrect,
        livesLeft: finalLives,
        reason
      }
    });
  }, [navigate, playerName]);

  useEffect(() => {
    if (!playerName || !playerName.trim()) return;
    if (status !== 'answering') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishGame('Hết giờ!', score, correctCount, lives);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status, score, correctCount, lives, finishGame, playerName]);

  useEffect(() => {
    if (!playerName || !playerName.trim()) return;
    let timerId;

    if (status === 'locked') {
      timerId = setTimeout(() => {
        setStatus('revealed');
      }, 1000);
    } else if (status === 'revealed') {
      timerId = setTimeout(() => {
        const isCorrect = selectedIndex === currentQ.answer;
        const newResults = [...results, isCorrect ? 'correct' : 'wrong'];
        setResults(newResults);

        const newLives = isCorrect ? lives : lives - 1;
        if (!isCorrect) {
          setLives(newLives);
        }

        const isLastQuestion = currentIndex === questions.length - 1;

        if (newLives <= 0) {
          const finalScore = calcScore(newResults, questions).score;
          const finalCorrect = calcScore(newResults, questions).correctCount;
          finishGame('Bạn đã hết mạng', finalScore, finalCorrect, 0);
        } else if (isLastQuestion) {
          const finalScore = calcScore(newResults, questions).score;
          const finalCorrect = calcScore(newResults, questions).correctCount;
          const reason = finalCorrect === questions.length
            ? 'Xuất sắc! Bạn đã trả lời đúng cả 15 câu'
            : 'Bạn đã hoàn thành thử thách';
          finishGame(reason, finalScore, finalCorrect, newLives);
        } else {
          setCurrentIndex((prev) => prev + 1);
          setSelectedIndex(null);
          setStatus('answering');
        }
      }, 1000);
    }

    return () => clearTimeout(timerId);
  }, [status, selectedIndex, currentQ, lives, currentIndex, questions, results, finishGame, playerName]);

  const handleSelectAnswer = (index) => {
    if (status !== 'answering') return;
    setSelectedIndex(index);
    setStatus('locked');
  };

  if (!playerName || !playerName.trim()) {
    return <Navigate to="/" replace />;
  }

  if (!currentQ) return null;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <StatusBar timeLeft={timeLeft} lives={lives} score={score} streak={streak} />
      <ProgressBar total={questions.length} currentIndex={currentIndex} results={results} />
      <QuestionCard
        question={currentQ}
        currentIndex={currentIndex}
        total={questions.length}
        status={status}
        selectedIndex={selectedIndex}
        onSelectAnswer={handleSelectAnswer}
      />
    </div>
  );
};

export default Play;