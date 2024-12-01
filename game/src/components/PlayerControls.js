import React from 'react';
import './PlayerControls.css';

const PlayerControls = ({ activePlayer, setActivePlayer }) => {
  return (
    <div className="player-controls">
      {[1, 2, 3, 4].map(player => (
        <button
          key={player}
          className={`player-btn player-${player} ${activePlayer === player ? 'active' : ''}`}
          onClick={() => setActivePlayer(player)}
        >
          Player {player}
        </button>
      ))}
    </div>
  );
};

export default PlayerControls;
