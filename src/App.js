import { useEffect, useState } from 'react';
import './App.css';
import Dice from './components/Dice';
import data from './data';
import ReactConfetti from 'react-confetti';

function App() {
  const randomNumber = () => Math.floor(Math.random() * 6 + 1);

  const [dices, setDices] = useState(data);
  const [hasWon, setHasWon] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(-1);
  const [selectedId, setSelectedId] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);

  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const windowResize = () => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    if (
      !dices.some((dice) => dice.hold === false) &&
      dices.every((dice) => dice.diceNumber === selectedNumber)
    ) {
      setHasWon(true);
      setIsPlaying(false);
    } else if (!dices.some((dice) => dice.hold === false)) {
      setIsPlaying(false);
    }

    window.addEventListener('resize', windowResize);

    return () => window.removeEventListener('resize', windowResize);
  }, [dices, windowDimension]);

  function handleRoll() {
    if (isPlaying) {
      setDices((prevDices) => {
        return prevDices.map((dice) =>
          dice.hold ? dice : { ...dice, diceNumber: randomNumber() }
        );
      });
    } else {
      setDices(data);
      setHasWon(false);
      setIsPlaying(true);
      console.log(data);
    }
  }

  function otherOperation(id) {
    if (selectedId === id && selectedId) {
      setSelectedId('');
      setSelectedNumber(-1);
    } else if (selectedId !== id && !selectedId) {
      setSelectedId(id);
      setSelectedNumber(dices.find((dice) => dice.id === id).diceNumber);
    }
  }

  function holdDice(id) {
    if (isPlaying) {
      otherOperation(id);
      setDices((prevDices) => {
        return prevDices.map((dice) =>
          dice.id === id ? { ...dice, hold: !dice.hold } : dice
        );
      });
    }
  }

  return (
    <main className="container">
      <h1 className="title">Tenzies</h1>
      <p className="description">
        Roll until all dice are the same. Click each dice to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">
        {dices.map((dice) => (
          <Dice key={dice.id} {...dice} holdDice={holdDice} />
        ))}
      </div>
      <button className="btn" onClick={handleRoll}>
        {isPlaying ? 'Roll' : 'Reset Game'}
      </button>

      {/* confetti */}
      {hasWon && (
        <ReactConfetti
          width={windowDimension.width}
          height={windowDimension.height}
          gravity={0.2}
        />
      )}
    </main>
  );
}

export default App;
