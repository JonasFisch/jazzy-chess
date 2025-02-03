import { PieceType as PieceType } from "@/types/piece";
import knightBlack from "@/assets/knight-black.svg";
import knightWhite from "@/assets/knight-white.svg";
import bishopBlack from "@/assets/bishop-black.svg";
import bishopWhite from "@/assets/bishop-white.svg";
import pawnBlack from "@/assets/pawn-black.svg";
import pawnWhite from "@/assets/pawn-white.svg";
import queenBlack from "@/assets/queen-black.svg";
import queenWhite from "@/assets/queen-white.svg";
import rookBlack from "@/assets/rook-black.svg";
import rookWhite from "@/assets/rook-white.svg";
import kingBlack from "@/assets/king-black.svg";
import kingWhite from "@/assets/king-white.svg";
import Image from "next/image";
import { useDraggable } from "@dnd-kit/core";

export function Piece({ piece }: { piece: PieceType }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `piece-${piece.id}`,
    data: piece,
  });

  return (
    <Image
      style={
        transform
          ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
              zIndex: 100,
            }
          : undefined
      }
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      src={
        piece.type === "knight"
          ? piece.color === "white"
            ? knightWhite
            : knightBlack
          : piece.type === "bishop"
          ? piece.color === "white"
            ? bishopWhite
            : bishopBlack
          : piece.type === "pawn"
          ? piece.color === "white"
            ? pawnWhite
            : pawnBlack
          : piece.type === "queen"
          ? piece.color === "white"
            ? queenWhite
            : queenBlack
          : piece.type === "rook"
          ? piece.color === "white"
            ? rookWhite
            : rookBlack
          : piece.type === "king"
          ? piece.color === "white"
            ? kingWhite
            : kingBlack
          : null
      }
      alt="knight"
      className="mx-auto my-auto z-20 select-none"
    />
  );
}
