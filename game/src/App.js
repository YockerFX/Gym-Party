import React, { useState, useEffect } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import PlayerControls from './components/PlayerControls';
import DiceRoll from './components/DiceRoll';

const App = () => {
  const [activePlayer, setActivePlayer] = useState(null);
  const [positions, setPositions] = useState({ 1: 0, 2: 0, 3: 0, 4: 0 });
  const [board, setBoard] = useState([]);

  useEffect(() => {
    // Initialisiere das Spielfeld mit der vorgegebenen Reihenfolge
    const initializeBoard = () => {
      const boardLayout = [
        0, 1, 2, 3, 4, 5, 6,
        23, 24, 25, 26, 27, 28, 7,
        22, 39, 40, 41, 42, 29, 8,
        21, 38, 47, 48, 43, 30, 9,
        20, 37, 46, 45, 44, 31, 10,
        19, 36, 35, 34, 33, 32, 11,
        18, 17, 16, 15, 14, 13, 12,
      ];

      const events = [
        "10 Push-ups",
        "15 Jumping Jacks",
        "20 Squats",
        "5 Burpees",
        "Rest Day",
      ];

      // Fülle das Spielfeld mit Ereignissen
      return boardLayout.map((id, index) => ({
        id,
        isGoal: id === 48, // Feld 48 ist das Ziel
        event: id === 48 ? "Goal" : events[index % events.length],
      }));
    };

    setBoard(initializeBoard());
  }, []);

  const movePlayer = (player, steps) => {
    setPositions(prevPositions => {
      const startPosition = prevPositions[player];
      const maxPosition = 48; // Ziel
      const overshoot = startPosition + steps - maxPosition;
  
      let path = [];
  
      if (steps > 0) {
        if (overshoot > 0) {
          // Spieler muss rückwärts gehen
          for (let i = 1; i <= steps; i++) {
            const nextPosition = startPosition + i;
            if (nextPosition <= maxPosition) {
              path.push(nextPosition);
            } else {
              // Rückwärtsbewegung
              const backwardPosition = maxPosition - (nextPosition - maxPosition);
              if (backwardPosition >= 0 && backwardPosition <= maxPosition) {
                path.push(backwardPosition);
              } else {
                console.error(`Backward position out of bounds: ${backwardPosition}`);
              }
            }
          }
        } else {
          // Normale Bewegung
          for (let i = 1; i <= steps; i++) {
            const forwardPosition = startPosition + i;
            if (forwardPosition >= 0 && forwardPosition <= maxPosition) {
              path.push(forwardPosition);
            } else {
              console.error(`Forward position out of bounds: ${forwardPosition}`);
            }
          }
        }
      }
  
      console.log(`Start Position: ${startPosition}, Steps: ${steps}`);
      console.log("Calculated Path for Player:", path);
  
      // Wenn kein Pfad berechnet wurde, bleibt der Spieler stehen
      if (path.length === 0) {
        console.warn(`Player ${player} did not move.`);
        return prevPositions;
      }
  
      animatePlayerMovement(player, path);
  
      return prevPositions; // Ursprüngliche Position zurückgeben; Änderungen erfolgen durch Animation
    });
  };
  
  
  const animatePlayerMovement = (player, path) => {
    let index = 0;
  
    const interval = setInterval(() => {
      if (index >= path.length) {
        clearInterval(interval);
  
        // Prüfen, ob der Spieler perfekt im Ziel ist
        if (path[path.length - 1] === 48) {
          alert(`Player ${player} has reached the goal perfectly!`);
        }
        return;
      }
  
      // Aktuelle Position sicherstellen
      const nextPosition = path[index];
      if (nextPosition === undefined || nextPosition < 0 || nextPosition > 48) {
        console.error(`Invalid position detected: ${nextPosition}. Stopping animation.`);
        clearInterval(interval);
        return;
      }
  
      // Setze die aktuelle Position des Spielers
      setPositions(prevPositions => ({
        ...prevPositions,
        [player]: nextPosition,
      }));
      console.log("Current Positions:", { ...positions, [player]: nextPosition });
      index++;
    }, 250); // Bewegung alle 0.25 Sekunden
  };

  return (
    <div className="app">
      <GameBoard board={board} positions={positions} />
      <PlayerControls activePlayer={activePlayer} setActivePlayer={setActivePlayer} />
      <DiceRoll activePlayer={activePlayer} movePlayer={movePlayer} />
    </div>
  );
};

export default App;
