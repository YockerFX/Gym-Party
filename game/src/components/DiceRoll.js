import React, { useState } from 'react';
import './DiceRoll.css';

const DiceRoll = ({ activePlayer, movePlayer }) => {
  const [dice, setDice] = useState(1);
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    if (rolling) return; // Verhindert Doppelklicks
    if (!activePlayer) {
      alert('Bitte zuerst einen Spieler auswählen!');
      return;
    }

    setRolling(true);
    const rollSequence = [];

    // Generiere eine Sequenz von zufälligen Zahlen
    for (let i = 0; i < 10; i++) {
      rollSequence.push(Math.floor(Math.random() * 6) + 1);
    }

    let index = 0;
    const interval = setInterval(() => {
      setDice(rollSequence[index++]);
      if (index === rollSequence.length) {
        clearInterval(interval);
        setRolling(false);

        // Letztes Ergebnis ist das echte Würfelergebnis
        const diceRoll = rollSequence[rollSequence.length - 1];
        movePlayer(activePlayer, diceRoll);
      }
    }, 100); // Zeigt jede Zahl für 100ms an
  };

  return (
    <div className="dice-roll">
      <div
        className={`dice ${rolling ? 'rolling' : ''}`}
        onClick={rollDice}
        role="button"
        aria-label="Roll the dice"
        tabIndex={0}
      >
        {dice}
      </div>
    </div>
  );
};

export default DiceRoll;
