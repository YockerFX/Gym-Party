import React from 'react';
import './GameBoard.css';
import Tile from './Tile';

const GameBoard = ({ board, positions }) => {
  const getPlayersOnTile = (tileId) => {
    return Object.entries(positions)
      .filter(([_, pos]) => pos === tileId)
      .map(([player]) => player);
  };

  return (
    <div className="game-board">
      {board.map(tile => (
        <Tile key={tile.id} tile={tile} players={getPlayersOnTile(tile.id)} />
      ))}
    </div>
  );
};

export default GameBoard;
