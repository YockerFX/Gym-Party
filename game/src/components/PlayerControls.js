import React from 'react';
import './PlayerControls.css';

const PlayerControls = ({ activePlayer, setActivePlayer }) => {
  return (
    <div className="player-controls">
      <button
        className={`player-btn player-1 ${activePlayer === 1 ? 'active' : ''}`}
        onClick={() => setActivePlayer(1)}
      >
        P1
      </button>
      <button
        className={`player-btn player-2 ${activePlayer === 2 ? 'active' : ''}`}
        onClick={() => setActivePlayer(2)}
      >
        P2
      </button>

      <button
        className={`player-btn player-3 ${activePlayer === 3 ? 'active' : ''}`}
        onClick={() => setActivePlayer(3)}
      >
        P3
      </button>
      <button
        className={`player-btn player-4 ${activePlayer === 4 ? 'active' : ''}`}
        onClick={() => setActivePlayer(4)}
      >
        P4
      </button>
    </div>
  );
};

export default PlayerControls;
