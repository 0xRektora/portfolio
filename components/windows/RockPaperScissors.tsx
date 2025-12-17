import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

type Choice = "rock" | "paper" | "scissor";
type GameState = "selecting" | "playing" | "result";

const CHOICES: Choice[] = ["rock", "paper", "scissor"];

const IMAGES = {
  rock: "/rock.png",
  paper: "/paper.png",
  scissor: "/scissor.png",
};

export const RockPaperScissors = () => {
  const [gameState, setGameState] = useState<GameState>("selecting");
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [result, setResult] = useState<string>("");

  const handleChoice = (choice: Choice) => {
    setPlayerChoice(choice);
    setGameState("playing");

    // Simulate computer thinking and animation time
    setTimeout(() => {
      const randomChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
      setComputerChoice(randomChoice);
      determineWinner(choice, randomChoice);
    }, 1500);
  };

  const determineWinner = (player: Choice, computer: Choice) => {
    if (player === computer) {
      setResult("It's a Draw!");
    } else if (
      (player === "rock" && computer === "scissor") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissor" && computer === "paper")
    ) {
      setScore((prev) => ({ ...prev, player: prev.player + 1 }));
      setResult("You Win!");
    } else {
      setScore((prev) => ({ ...prev, computer: prev.computer + 1 }));
      setResult("Computer Wins!");
    }
    setGameState("result");
  };

  const resetGame = () => {
    setGameState("selecting");
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult("");
  };

  return (
    <div className="h-full flex flex-col bg-[#2e2e2e] text-white p-4 font-vt323 overflow-hidden relative select-none">
      {/* Score Board */}
      <div className="flex justify-between items-center mb-8 px-8 py-4 bg-black/20 rounded-xl border border-white/10">
        <div className="text-center">
          <div className="text-sm text-gray-400">PLAYER</div>
          <div className="text-4xl font-bold text-green-400">
            {score.player}
          </div>
        </div>
        <div className="text-2xl font-bold text-yellow-400">VS</div>
        <div className="text-center">
          <div className="text-sm text-gray-400">CPU</div>
          <div className="text-4xl font-bold text-red-400">
            {score.computer}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        <AnimatePresence mode="wait">
          {gameState === "selecting" && (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex gap-8 items-center justify-center w-full"
            >
              {CHOICES.map((choice) => (
                <motion.div
                  key={choice}
                  whileHover={{ scale: 1.1, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleChoice(choice)}
                  className="cursor-pointer relative group flex flex-col items-center"
                >
                  <div className="w-32 h-44 relative bg-[#d6cfb4] rounded-lg shadow-xl border-4 border-[#4a4a4a] overflow-hidden transform transition-transform group-hover:rotate-1">
                    <Image
                      src={IMAGES[choice]}
                      alt={choice}
                      fill
                      className="object-cover p-2 [image-rendering:pixelated]"
                    />
                  </div>
                  <span className="mt-4 text-xl uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity text-yellow-200">
                    {choice}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {(gameState === "playing" || gameState === "result") &&
            playerChoice && (
              <div
                className="flex items-center justify-center gap-20 w-full h-full"
                key="gameplay"
              >
                {/* Player Choice */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0, x: -100 }}
                  animate={{
                    scale: gameState === "playing" ? 1.2 : 1,
                    opacity: 1,
                    x: 0,
                    rotate: gameState === "result" ? 0 : -10,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="relative flex flex-col items-center"
                >
                  <div className="text-sm mb-4 text-green-400 font-bold tracking-widest">
                    YOU
                  </div>
                  <div className="w-40 h-56 relative bg-[#d6cfb4] rounded-lg shadow-2xl border-4 border-[#4a4a4a] overflow-hidden">
                    <Image
                      src={IMAGES[playerChoice]}
                      alt="Player choice"
                      fill
                      className="object-cover p-2 [image-rendering:pixelated]"
                    />
                  </div>
                </motion.div>

                {/* VS / Result */}
                <div className="flex flex-col items-center justify-center w-32">
                  {gameState === "result" ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="flex flex-col items-center"
                    >
                      <div className="text-3xl font-bold text-center mb-4 leading-none whitespace-nowrap text-white drop-shadow-lg">
                        {result}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={resetGame}
                        className="px-6 py-2 bg-yellow-500 text-black font-bold rounded shadow-lg hover:bg-yellow-400 transition-colors uppercase tracking-wider"
                      >
                        Play Again
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="text-4xl font-bold text-white/20"
                    >
                      VS
                    </motion.div>
                  )}
                </div>

                {/* Computer Choice */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0, x: 100 }}
                  animate={{
                    scale: gameState === "playing" ? 1.2 : 1,
                    opacity: 1,
                    x: 0,
                    rotate: gameState === "result" ? 0 : 10,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: 0.2,
                  }}
                  className="relative flex flex-col items-center"
                >
                  <div className="text-sm mb-4 text-red-400 font-bold tracking-widest">
                    CPU
                  </div>
                  <div className="w-40 h-56 relative bg-[#d6cfb4] rounded-lg shadow-2xl border-4 border-[#4a4a4a] overflow-hidden">
                    {computerChoice ? (
                      <Image
                        src={IMAGES[computerChoice]}
                        alt="Computer choice"
                        fill
                        className="object-cover p-2 [image-rendering:pixelated]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#2a2a2a] animate-pulse">
                        <span className="text-4xl">?</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-2 right-2 text-xs text-white/10 pointer-events-none">
        RPS v1.0
      </div>
    </div>
  );
};
