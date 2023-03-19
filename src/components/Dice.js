import './Dice.css';

const Dice = ({ id, diceNumber, hold, holdDice }) => {
  return (
    <button
      className={`btn-dice ${hold ? 'dice-hold' : ''}`}
      onClick={() => holdDice(id)}
    >
      {diceNumber}
    </button>
  );
};

export default Dice;
