"use client";

import { PieceType, Position } from "@/types/piece";
import { useEffect, useState } from "react";
import { Piece } from "./piece";
import { getLetterFromNumber, isOwnFigure } from "@/utils";
import { CHESS_COLOR } from "@/types/chess";
import { Droppable } from "./droppable";
import { DndContext } from "@dnd-kit/core";

export function Board({
  orientation,
  playersColor,
  pieces,
  onMove,
  canMove,
}: {
  orientation: CHESS_COLOR;
  playersColor: CHESS_COLOR;
  pieces: PieceType[];
  onMove: (piece: PieceType, position: Position) => void;
  canMove: boolean;
}) {
  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
      console.log("setting screen width");
    });
    setScreenWidth(window.innerWidth);
    return removeEventListener("resize", () => {});
  }, []);

  const [active, setActive] = useState<PieceType | null>();

  return (
    <DndContext
      onDragEnd={(event) => {
        const piece = event.active.data.current as PieceType;
        const destinationSquare = event.over?.data.current as {
          position: Position;
          piece: PieceType | null;
        };

        if (
          !isOwnFigure(playersColor, destinationSquare.piece) &&
          destinationSquare &&
          (piece.position.col !== destinationSquare.position.col ||
            piece.position.row !== destinationSquare.position.row)
        ) {
          // move piece to new position
          onMove(piece, destinationSquare.position);
          setActive(null);
        }
      }}
      onDragStart={(event) => {
        const piece = event.active.data.current as PieceType;
        if (isOwnFigure(playersColor, piece)) {
          setActive(piece);
        }
      }}
    >
      <div className="grid grid-flow-col grid-rows-8 w-full auto-cols-max justify-center">
        {Array.from({ length: 64 })
          .map((_, i) => i)
          .sort((a, b) => {
            return orientation === "black" ? a - b : b - a;
          })
          .map((i) => {
            const row = Math.floor(i / 8);
            const col = i % 8;
            const isBlack = (row + col) % 2 === 1;
            const piece =
              pieces.find(
                (piece) =>
                  piece.position.row === row && piece.position.col === col
              ) ?? null;
            const isActive = active && active?.id === piece?.id;

            return (
              <Droppable
                key={`${row}-${col}`}
                id={`${row}-${col}`}
                position={{ row, col }}
                piece={piece}
              >
                <div
                  className={`${
                    isBlack ? "bg-slate-400" : "bg-slate-300"
                  } max-h-20 max-w-20 flex relative select-none`}
                  style={{
                    height: `${screenWidth / 8}px`,
                    width: `${screenWidth / 8}px`,
                  }}
                  onClick={() => {
                    // only select own pieces
                    if (isOwnFigure(playersColor, piece)) {
                      setActive(piece);
                      return;
                    }

                    // if active move to new position
                    if (active) {
                      onMove(active, { row, col });
                      setActive(null);
                    }
                  }}
                >
                  {/* row letter */}
                  {col === (orientation === "black" ? 7 : 0) && (
                    <div className={`absolute bottom-0.5 left-1 text-xs`}>
                      {getLetterFromNumber(7 - row)}
                    </div>
                  )}

                  {/* col number */}
                  {row === (orientation === "black" ? 7 : 0) && (
                    <div className="absolute top-0.5 right-1 text-xs">
                      {col + 1}
                    </div>
                  )}

                  {/* active indicator */}
                  {isActive && (
                    <div className="z-10 h-full w-full absolute bg-indigo-500/70"></div>
                  )}

                  {/* piece */}
                  {piece && <Piece piece={piece} />}
                </div>
              </Droppable>
            );
          })}
      </div>
    </DndContext>
  );
}
