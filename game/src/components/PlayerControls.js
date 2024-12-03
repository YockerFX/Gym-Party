import React from 'react';
import './PlayerControls.css';

const PlayerControls = ({ activePlayer, setActivePlayer }) => {
  const handlePlayerSelect = (player) => {
    setActivePlayer(player);
  };

  return (
    <div className="player-controls">
      <button
        className={`player-btn player-btn-1 ${activePlayer === 1 ? 'active' : ''}`}
        onClick={() => handlePlayerSelect(1)}
      >
        P1
      </button>
      <button
        className={`player-btn player-btn-2 ${activePlayer === 2 ? 'active' : ''}`}
        onClick={() => handlePlayerSelect(2)}
      >
        P2
      </button>
      <button
        className={`player-btn player-btn-3 ${activePlayer === 3 ? 'active' : ''}`}
        onClick={() => handlePlayerSelect(3)}
      >
        P3
      </button>
      <button
        className={`player-btn player-btn-4 ${activePlayer === 4 ? 'active' : ''}`}
        onClick={() => handlePlayerSelect(4)}
      >
        P4
      </button>
    </div>
  );
};

export default PlayerControls;
