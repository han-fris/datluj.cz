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
  const [letters, setLetters] = useState<number>(6);
  const [words, setWords] = useState<string[]>([
    'jahoda',
    generateWord(letters),
    generateWord(letters),
  ]);

  const [mistakes, setMistakes] = useState<number>(0);
  const [correctWords, setCorrectWords] = useState<number>(0);

  const handleMistake = () => {
    setMistakes((prev) => prev + 1);
  };

  const handleWordLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (value >= 3 && value <= 20) {
      setLetters(value);

      setWords([generateWord(value), generateWord(value), generateWord(value)]);
    }
  };

  const handleFinish = () => {
    setCorrectWords((prev) => prev + 1);

    setWords((prevWords) => {
      const updated = [...prevWords.slice(1), generateWord(letters)];
      return updated;
    });
  };

  return (
    <div className="stage">
      <h1>Datlování</h1>
      <p>
        Natrénuj si psaní všemi deseti, zvol si délku slov mezi 3 - 20 písmeny a
        datluj!
      </p>
      <div className="stage__select">
        <input
          type="range"
          min="3"
          max="20"
          value={letters}
          onChange={handleWordLength}
        />{' '}
        <br />
        <h3 className="stage__letters">{letters} písmen</h3>
      </div>
      <div className="stage__mistakes">Počet chyb: {mistakes}</div>
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
