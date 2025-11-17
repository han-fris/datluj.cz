import React, { useState, useEffect } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
  onFinish: () => void;
  active: boolean;
  onMistake: () => void;
}
const Wordbox: React.FC<IWordboxProp> = ({
  word,
  onFinish,
  active,
  onMistake,
}) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word);
  const [mistake, setMistake] = useState<boolean>(false);

  useEffect(() => {
    setLettersLeft(word);
    setMistake(false);
  }, [word]);

  useEffect(() => {
    if (!active) return;

    const handleKeyUp = (e: KeyboardEvent) => {
 
      const key = e.key.toLowerCase();

      if (!lettersLeft || lettersLeft.length === 0) return;

      if (key === lettersLeft[0]) {
        setMistake(false);

        if (lettersLeft.length === 1) {
          onFinish();
        }

        setLettersLeft((x) => x.slice(1));
      } else {
        setMistake(true);
        onMistake();
      }
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [lettersLeft, active, onFinish, onMistake]);

  return (
   <div className={`wordbox ${active ? 'wordbox--active' : ''} ${mistake ? 'wordbox--mistake' : ''}`}>
  {lettersLeft}
</div>
  );
};

export default Wordbox;
