"use client";

import { Board } from "@/components/board";
import { Game } from "@/schema";
import { ChessColor } from "@/types/chess";
import { PieceType, Position } from "@/types/piece";
import { useCoState } from "jazz-react";
import { createInviteLink, ID } from "jazz-tools";
import { use, useState } from "react";

export default function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const game = useCoState(Game, id as ID<Game>);
  const [orientation, setOrientation] = useState<ChessColor>("white");
  const myColor = game?.white?.isMe ? "white" : "black";

  // modify board state
  const handleMove = (piece: PieceType, newPosition: Position) => {
    if (!game || game.turn !== myColor) return;

    // TODO: check if move is valid

    setBoardPieces(
      boardPieces
        .map((p) => {
          // TODO: check if move is valid!

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
    game.turn = game.turn === "white" ? "black" : "white";
  };
  const setBoardPieces = (pieces: PieceType[]) => {
    if (game) game.board_state = { pieces };
  };
  const boardPieces = game?.board_state.pieces ?? [];

  const invite = () => {
    if (game) {
      const inviteLink = createInviteLink(
        game,
        "writer",
        window.location.origin,
        "game"
      );
      if (inviteLink) {
        navigator.clipboard.writeText(inviteLink);
        console.log("copied invite link to clipboard");
      }
    }
  };

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
          playersColor={game?.white?.isMe ? "white" : "black"}
          onMove={handleMove}
          canMove={true}
        />
        <button
          onClick={() => {
            invite();
          }}
        >
          invite
        </button>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        footer
      </footer>
    </div>
  );
}
