import { ChessColor } from "./types/chess";
import { PieceType } from "./types/piece";

export const getLetterFromNumber = (num: number) => {
  return String.fromCharCode(97 + num);
};

export const isOwnFigure = (
  playersColor: ChessColor,
  piece: PieceType | null
) => playersColor === piece?.color;
