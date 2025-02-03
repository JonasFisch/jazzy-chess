"use client";

import { PieceType, Position } from "@/types/piece";
import { useEffect, useState } from "react";
import { Piece } from "./piece";
import { isOwnFigure } from "@/utils";
import { CHESS_COLOR } from "@/types/chess";
import { Square } from "./square";
import { DndContext, DragOverlay } from "@dnd-kit/core";

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
        if (!canMove) return;

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
      <DragOverlay dropAnimation={null}>
        {active && <Piece draggable={false} piece={active} />}
      </DragOverlay>
      <div className="grid grid-flow-col grid-rows-8 w-full auto-cols-max justify-center">
        {Array.from({ length: 64 })
          .map((_, i) => i)
          .sort((a, b) => {
            return orientation === "black" ? a - b : b - a;
          })
          .map((i) => {
            const row = Math.floor(i / 8);
            const col = i % 8;
            const piece =
              pieces.find(
                (piece) =>
                  piece.position.row === row && piece.position.col === col
              ) ?? null;
            const isActive = active && active?.id === piece?.id;

            return (
              <Square
                key={`${row}-${col}`}
                id={`${row}-${col}`}
                position={{ row, col }}
                piece={piece}
                isActive={!!isActive}
                orientation={orientation}
                screenWidth={screenWidth}
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
                {piece && (
                  <Piece
                    piece={piece}
                    draggable={isOwnFigure(playersColor, piece)}
                  />
                )}
              </Square>
            );
          })}
      </div>
    </DndContext>
  );
}
