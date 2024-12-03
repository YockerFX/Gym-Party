import React, { useState, useEffect } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import PlayerControls from './components/PlayerControls';
import DiceRoll from './components/DiceRoll';
import eventIcons from './config/config';
import trophyImage from './assets/trophy.png';

const App = () => {
  const [activePlayer, setActivePlayer] = useState(null);
  const [positions, setPositions] = useState({ 1: 0, 2: 0, 3: 0, 4: 0 });
  const [board, setBoard] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null); // Zustand für Event-Popup

  const laddersAndSlides = {
    8: 29,  // Leiter 1
    17: 36, // Leiter 2
    32: 13, // Rutsche 1
    39: 24, // Rutsche 2
    46: 35, // Rutsche 3
  };

  const exerciseLabels = {
    pushup: 'Push Up',
    jumpingJack: 'Jumping Jacks',
    situp: 'Sit Ups',
    burpee: 'Burpee',
    plank: 'Plank',
    wall: 'Wall Sitting',
  };

  const processCurrentEvent = (events) => {
    // Entferne Duplikate basierend auf dem Typ der Aufgabe
    const uniqueEvents = events.reduce((acc, event) => {
      if (!acc.some(e => e.type === event.type)) {
        acc.push(event);
      }
      return acc;
    }, []);

    // Begrenze auf maximal zwei Aufgaben
    return uniqueEvents.slice(0, 2);
  };

  useEffect(() => {
    const initializeBoard = () => {
      const events = [
        { type: 'pushup', count: 10 },
        { type: 'jumpingJack', count: 15 },
        { type: 'situp', count: 20 },
        { type: 'burpee', count: 5 },
        { type: 'plank', count: 30 },
        { type: 'wall', count: 60 },
      ];

      const boardLayout = [
        0, 1, 2, 3, 4, 5, 6,
        23, 24, 25, 26, 27, 28, 7,
        22, 39, 40, 41, 42, 29, 8,
        21, 38, 47, 48, 43, 30, 9,
        20, 37, 46, 45, 44, 31, 10,
        19, 36, 35, 34, 33, 32, 11,
        18, 17, 16, 15, 14, 13, 12,
      ];

      return boardLayout.map((id, index) => {
        if (id === 0) {
          return { id, isStart: true, event: null };
        }
        if (id === 48) {
          return { id, isGoal: true, event: null, image: trophyImage, icon: trophyImage };
        }

        const event = events[index % events.length];
        return {
          id,
          isStart: false,
          isGoal: false,
          event: { type: event.type, count: event.count, icon: eventIcons[event.type] },
        };
      });
    };

    setBoard(initializeBoard());
  }, []);

  const movePlayer = (player, steps) => {
    setPositions((prevPositions) => {
      const startPosition = prevPositions[player];
      const maxPosition = 48;
      const overshoot = startPosition + steps - maxPosition;

      let path = [];

      if (steps > 0) {
        if (overshoot > 0) {
          for (let i = 1; i <= steps; i++) {
            const nextPosition = startPosition + i;
            if (nextPosition <= maxPosition) {
              path.push(nextPosition);
            } else {
              const backwardPosition = maxPosition - (nextPosition - maxPosition);
              if (backwardPosition >= 0 && backwardPosition <= maxPosition) {
                path.push(backwardPosition);
              }
            }
          }
        } else {
          for (let i = 1; i <= steps; i++) {
            const forwardPosition = startPosition + i;
            if (forwardPosition >= 0 && forwardPosition <= maxPosition) {
              path.push(forwardPosition);
            }
          }
        }
      }

      console.log(`Calculated path for Player ${player}:`, path);

      animatePlayerMovement(player, path);

      return prevPositions;
    });
  };

  const animatePlayerMovement = (player, path) => {
    let index = 0;

    const interval = setInterval(() => {
      if (index >= path.length) {
        clearInterval(interval);

        const currentPosition = path[path.length - 1];

        // Prüfe auf Leiter oder Rutsche
        if (laddersAndSlides[currentPosition]) {
          const targetPosition = laddersAndSlides[currentPosition];
          console.log(
            `Player ${player} hits a ${
              currentPosition < targetPosition ? 'ladder' : 'slide'
            }! Moving to ${targetPosition}`
          );

          const startTile = board.find((t) => t.id === currentPosition);
          const targetTile = board.find((t) => t.id === targetPosition);

          if (startTile?.event && targetTile?.event) {
            setCurrentEvent((prev) =>
              processCurrentEvent([
                ...(prev || []),
                startTile.event,
                targetTile.event,
              ])
            );
            setTimeout(() => setCurrentEvent(null), 3000);
          }

          animatePlayerMovement(player, [targetPosition]);
          return;
        }

        const tile = board.find((t) => t.id === currentPosition);
        if (tile?.event) {
          setCurrentEvent((prev) =>
            processCurrentEvent([...(prev || []), tile.event])
          );
          setTimeout(() => setCurrentEvent(null), 3000);
        }

        if (currentPosition === 48) {
          alert(`Player ${player} has reached the goal!`);
        }
        return;
      }

      const nextPosition = path[index];
      setPositions((prevPositions) => ({
        ...prevPositions,
        [player]: nextPosition,
      }));
      index++;
    }, 250);
  };

  return (
    <div className="app">
      {currentEvent && (
        <div className="event-popup">
          {currentEvent.map((event, index) => (
            <div key={index} className="popup-event">
              <img src={event.icon} alt={event.type} className="popup-icon" />
              <span className="popup-count">{event.count}</span>
              <span className="popup-label">{exerciseLabels[event.type]}</span>
            </div>
          ))}
        </div>
      )}
      <GameBoard board={board} positions={positions} laddersAndSlides={laddersAndSlides} />
      <PlayerControls activePlayer={activePlayer} setActivePlayer={setActivePlayer} />
      <DiceRoll activePlayer={activePlayer} movePlayer={movePlayer} />
    </div>
  );
};

export default App;
