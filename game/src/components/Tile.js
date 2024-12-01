import React from 'react';
import './Tile.css';

const Tile = ({ tile, players }) => {
  return (
    <div className={`tile ${tile.isGoal ? 'goal' : ''}`}>
      <div className="event">
        {tile.event && (
          <>
            <img src={tile.event.icon} alt={tile.event.type} className="event-icon" />
            <span>{tile.event.count}</span>
          </>
        )}
      </div>
      <div className="players">
        {players.map(player => (
          <span key={player} className={`player player-${player}`}>
            P{player}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Tile;
