"use client";

import { Board } from "@/components/board";
import { Button } from "@/components/button";
import { PlayerDetails } from "@/components/player-details";
import { Game } from "@/schema";
import { ChessColor } from "@/types/chess";
import { PieceType, Position } from "@/types/piece";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/16/solid";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { useAccount, useCoState } from "jazz-react";
import { createInviteLink, ID } from "jazz-tools";
import Link from "next/link";
import { use, useEffect, useState } from "react";

export default function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const game = useCoState(Game, id as ID<Game>);
  const [orientation, setOrientation] = useState<ChessColor>("white");
  const myColor = game?.white?.isMe ? "white" : "black";
  const { me } = useAccount();
  const opponent = game?.white?.isMe ? game.black : game?.white;

  useEffect(() => {
    if (myColor) {
      setOrientation(myColor);
    }
  }, [myColor]);

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
      <header className="row-start-1 w-full">
        <div className="w-full flex flex-row justify-between items-center p-4 sm:p-0">
          <Link href="/" className="">
            <span>&larr; back</span>
          </Link>
          <h1 className="text-2xl font-bold">JazzyChess</h1>
        </div>
      </header>
      <main className="flex flex-col items-center gap-4 row-start-2">
        <PlayerDetails
          player={opponent}
          color={myColor == "white" ? "black" : "white"}
        />
        <Board
          orientation={orientation}
          pieces={boardPieces}
          playersColor={game?.white?.isMe ? "white" : "black"}
          onMove={handleMove}
          canMove={true}
        />
        <PlayerDetails player={me} color={myColor} />
        <div className="w-full justify-center flex items-center gap-4">
          <Button
            onClick={() =>
              setOrientation(orientation === "black" ? "white" : "black")
            }
          >
            <ArrowPathRoundedSquareIcon className="size-5" />
            <span>Flip Board</span>
          </Button>
          {!(game?.white && game.black) && (
            <Button onClick={() => invite()}>
              <UserPlusIcon className="size-5" />
              <span>Invite</span>
            </Button>
          )}
        </div>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center">
        <span>
          {"Made with ❤️ by "}
          <a target="_blank" href={"https://jonasfsr.com"}>
            jonasfsr
          </a>
        </span>
      </footer>
    </div>
  );
}
