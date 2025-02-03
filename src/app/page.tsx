"use client";

import { Board } from "@/components/board";
import { boardStartPieces } from "@/data/board-start-pieces";
import { CHESS_COLOR } from "@/types/chess";
import { PieceType } from "@/types/piece";
import { useState } from "react";

export default function Home() {
  const [orientation, setOrientation] = useState<CHESS_COLOR>("white");

  const [boardPieces, setBoardPieces] = useState<PieceType[]>([
    ...boardStartPieces,
  ]);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen sm:p-8 pb-4 gap-16 w-full overflow-hidden">
      <header className="row-start-1">
        <h1 className="text-2xl font-bold">JazzyChess</h1>
        <button
          onClick={() =>
            setOrientation(orientation === "black" ? "white" : "black")
          }
        >
          flip
        </button>
      </header>
      <main className="flex flex-col items-center gap-8 row-start-2 w-full">
        <h1 className="text-xl">Board</h1>
        <Board
          orientation={orientation}
          pieces={boardPieces}
          playersColor={"white"}
          onMove={(piece, newPosition) => {
            setBoardPieces(
              boardPieces
                .map((p) => {
                  // TODO: check if move is valid!s

                  // handle hitting pieces
                  if (
                    p.position.row === newPosition.row &&
                    p.position.col === newPosition.col
                  )
                    return null;

                  // set new position of piece
                  if (p.id === piece.id) p.position = newPosition;

                  return p;
                })
                .filter((p) => p !== null)
            );
          }}
          canMove={true}
        />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        footer
      </footer>
    </div>
  );
}
