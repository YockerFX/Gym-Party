import React from 'react';
import './Tile.css';

const Tile = ({ tile, players, laddersAndSlides }) => {
  const playerPositions = {
    1: { top: '10%', left: '10%' }, // Spieler 1 in der oberen linken Ecke
    2: { top: '10%', right: '10%' }, // Spieler 2 in der oberen rechten Ecke
    3: { bottom: '10%', left: '10%' }, // Spieler 3 in der unteren linken Ecke
    4: { bottom: '10%', right: '10%' }, // Spieler 4 in der unteren rechten Ecke
  };

  const startIcon =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXBsYXkiPjxwb2x5Z29uIHBvaW50cz0iNiAzIDIwIDEyIDYgMjEgNiAzIi8+PC9zdmc+';

  const finishIcon =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXRyb3BoeSI+PHBhdGggZD0iTTYgOUg0LjVhMi41IDIuNSAwIDAgMSAwLTVINiIvPjxwYXRoIGQ9Ik0xOCA5aDEuNWEyLjUgMi41IDAgMCAwIDAtNUgxOCIvPjxwYXRoIGQ9Ik00IDIyaDE2Ii8+PHBhdGggZD0iTTEwIDE0LjY2VjE3YzAgLjU1LS40Ny45OC0uOTcgMS4yMUM3Ljg1IDE4Ljc1IDcgMjAuMjQgNyAyMiIvPjxwYXRoIGQ9Ik0xNCAxNC42NlYxN2MwIC41NS40Ny45OC45NyAxLjIxQzE2LjE1IDE4Ljc1IDE3IDIwLjI0IDE3IDIyIi8+PHBhdGggZD0iTTE4IDJINnY3YTYgNiAwIDAgMCAxMiAwVjJaIi8+PC9zdmc+';

  const isLadder = laddersAndSlides && laddersAndSlides[tile.id] && tile.id < laddersAndSlides[tile.id];
  const isSlide = laddersAndSlides && laddersAndSlides[tile.id] && tile.id > laddersAndSlides[tile.id];

  return (
    <div
      className={`tile ${tile.isGoal ? 'goal' : ''} ${tile.isStart ? 'start' : ''}`}
    >
      <div className="event">
        {tile.isStart ? ( // Startfeld
          <img src={startIcon} alt="Start Icon" className="start-icon" />
        ) : tile.isGoal ? ( // Zielfeld
          <img src={finishIcon} alt="Finish Icon" className="finish-icon" />
        ) : isLadder ? ( // Leiter-Feld mit Aufgabe
          <>
            <span className="ladder">🔼</span>
            <img
              src={tile.event.icon}
              alt={tile.event.type}
              className="event-icon"
            />
            <span>{tile.event.count}</span>
          </>
        ) : isSlide ? ( // Rutschen-Feld mit "Unlucky"
          <>
            <span className="slide">🔽</span>
            <span className="unlucky-text">Unlucky</span>
          </>
        ) : tile.event ? ( // Normales Feld mit Aufgabe
          <>
            <img
              src={tile.event.icon}
              alt={tile.event.type}
              className="event-icon"
            />
            <span>{tile.event.count}</span>
          </>
        ) : null}
      </div>
      {players.map((player) => (
        <div
          key={player}
          className={`player player-${player}`}
          style={playerPositions[player]}
        >
          P{player}
        </div>
      ))}
    </div>
  );
};

export default Tile;
