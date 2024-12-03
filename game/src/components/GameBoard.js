import React from 'react';
import './GameBoard.css';
import Tile from './Tile';

const GameBoard = ({ board, positions, laddersAndSlides }) => {
  const getPlayersOnTile = (tileId) => {
    return Object.entries(positions)
      .filter(([_, pos]) => pos === tileId)
      .map(([player]) => parseInt(player));
  };

  return (
    <div className="game-board">
      {board.map((tile) => (
        <Tile
          key={tile.id}
          tile={tile}
          players={getPlayersOnTile(tile.id)}
          laddersAndSlides={laddersAndSlides}
        />
      ))}
    </div>
  );
};

export default GameBoard;

