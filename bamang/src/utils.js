import { POINTS, STREAK_BONUS } from './data';

export const calcScore = (results, questions) => {
  return results.reduce(
    (acc, res, index) => {
      if (res === 'correct') {
        const currentStreak = acc.streak + 1;
        const level = questions[index]?.level || 1;
        const basePoint = POINTS[level] || 0;
        const bonus = currentStreak >= 3 ? STREAK_BONUS : 0;

        return {
          score: acc.score + basePoint + bonus,
          streak: currentStreak,
          correctCount: acc.correctCount + 1,
        };
      } else if (res === 'wrong') {
        return {
          ...acc,
          streak: 0,
        };
      }
      return acc;
    },
    { score: 0, streak: 0, correctCount: 0 }
  );
};