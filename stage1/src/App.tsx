import { useState, useEffect } from "react";

interface GameState {
  targetColor: string;
  colorOptions: string[];
  score: number;
  gameStatus: string;
  isCorrect: boolean | null;
}

const generateRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const generateColorOptions = (correctColor: string): string[] => {
  const options = [correctColor];
  while (options.length < 6) {
    const newColor = generateRandomColor();
    if (!options.includes(newColor)) {
      options.push(newColor);
    }
  }
  return options.sort(() => Math.random() - 0.5);
};

const containerStyles: React.CSSProperties = {
  width: "100%",
  maxWidth: "400px", // Reduced from 600px
  padding: "15px", // Reduced padding
};

const colorBoxStyles: React.CSSProperties = {
  width: "100%",
  height: "120px", // Reduced height
  borderRadius: "8px",
  marginBottom: "1.5rem",
  transition: "background-color 0.3s ease",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
};

const colorOptionsGridStyles: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "0.8rem", // Reduced gap
  marginBottom: "1.5rem",
};

const colorOptionStyles: React.CSSProperties = {
  aspectRatio: "1",
  borderRadius: "50%", // Make options circular
  border: "1px solid transparent",
  cursor: "pointer",
  transition: "transform 0.2s ease, border-color 0.25s, box-shadow 0.2s ease",
};

export default function ColorGame() {
  const [gameState, setGameState] = useState<GameState>({
    targetColor: "",
    colorOptions: [],
    score: 0,
    gameStatus: "",
    isCorrect: null,
  });

  const startNewGame = (): void => {
    const newTargetColor = generateRandomColor();
    setGameState((prev) => ({
      ...prev,
      targetColor: newTargetColor,
      colorOptions: generateColorOptions(newTargetColor),
      gameStatus: "",
      isCorrect: null,
    }));
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleGuess = (color: string): void => {
    if (color === gameState.targetColor) {
      setGameState((prev) => ({
        ...prev,
        score: prev.score + 1,
        gameStatus: "Correct! Well done!",
        isCorrect: true,
      }));
      setTimeout(startNewGame, 1500);
    } else {
      setGameState((prev) => ({
        ...prev,
        gameStatus: "Wrong! Try again!",
        isCorrect: false,
      }));
    }
  };

  return (
    <div style={containerStyles}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "0.8rem",
          fontSize: "2em", // Reduced font size
        }}
      >
        Color Game
      </h1>

      <p
        data-testid="gameInstructions"
        style={{
          textAlign: "center",
          marginBottom: "1.2rem",
          opacity: 0.9,
          fontSize: "0.9em", // Reduced font size
        }}
      >
        Match the color shown in the box!
      </p>

      <div
        data-testid="colorBox"
        style={{
          ...colorBoxStyles,
          backgroundColor: gameState.targetColor,
        }}
      />

      <div style={colorOptionsGridStyles}>
        {gameState.colorOptions.map((color, index) => (
          <button
            key={index}
            data-testid="colorOption"
            style={{
              ...colorOptionStyles,
              backgroundColor: color,
            }}
            onMouseOver={(e) => {
              (e.target as HTMLButtonElement).style.transform = "scale(1.1)";
              (e.target as HTMLButtonElement).style.boxShadow =
                "0 4px 12px rgba(0, 0, 0, 0.2)";
            }}
            onMouseOut={(e) => {
              (e.target as HTMLButtonElement).style.transform = "scale(1)";
              (e.target as HTMLButtonElement).style.boxShadow = "none";
            }}
            onClick={() => handleGuess(color)}
          />
        ))}
      </div>

      <p
        data-testid="gameStatus"
        style={{
          textAlign: "center",
          minHeight: "1.5em",
          marginBottom: "1rem",
          fontSize: "0.9em", // Reduced font size
          color:
            gameState.isCorrect === true
              ? "#4ade80"
              : gameState.isCorrect === false
              ? "#ef4444"
              : "inherit",
        }}
      >
        {gameState.gameStatus}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p data-testid="score" style={{ fontSize: "1.1em" }}>
          Score: {gameState.score}
        </p>

        <button
          data-testid="newGameButton"
          onClick={startNewGame}
          style={{
            backgroundColor: "#646cff",
            color: "white",
            padding: "0.5em 1em", // Reduced padding
            fontSize: "0.9em", // Reduced font size
          }}
        >
          New Game
        </button>
      </div>
    </div>
  );
}
