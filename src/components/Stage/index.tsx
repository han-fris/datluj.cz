import { useState } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';

const generateWord = (size: number): string => {
  const sizeIndex =
    size === undefined ? Math.floor(Math.random() * wordList.length) : size - 3;

  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return 'error';
  }

  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
};

const Stage = () => {
  const [words, setWords] = useState<string[]>([
    'jahoda',
    generateWord(6),
    generateWord(6),
  ]);
  const [mistakes, setMistakes] = useState<number>(0);
  const [correctWords, setCorrectWords] = useState<number>(0);

  const handleMistake = () => {
    setMistakes((prev) => prev + 1);
  };

  const handleFinish = () => {
    setCorrectWords((prev) => prev + 1);

    setWords((prevWords) => {
      const updated = [...prevWords.slice(1), generateWord(6)];
      return updated;
    });
  };

  return (
    <div className="stage">
      <div className="stage__mistakes">Chyb: {mistakes}</div>
      <div className="stage__correct">
        Správně napsaná slova: {correctWords}
      </div>
      <div className="stage__words">
        {words.map((word, i) => (
          <Wordbox
            key={word + i}
            word={word}
            active={i === 0}
            onFinish={handleFinish}
            onMistake={handleMistake}
          />
        ))}
      </div>
    </div>
  );
};

export default Stage;
