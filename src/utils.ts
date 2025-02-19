import {
  diagonalFreeMovement,
  fieldOccupiedByColor,
  movesDiagonal,
  movesStraight,
  straightFreeMovement,
} from "./chess-utils";
import { ChessColor } from "./types/chess";
import { PieceType, Position } from "./types/piece";

export const getLetterFromNumber = (num: number) => {
  return String.fromCharCode(97 + num);
};

export const isOwnFigure = (
  playersColor: ChessColor,
  piece: PieceType | null
) => playersColor === piece?.color;

export const moveIsValid = (
  piece: PieceType,
  newPosition: Position,
  board: PieceType[]
) => {
  // TODO: check if move stops check!

  if (piece.type === "bishop") {
    // check if the move is diagonal and free of other pieces
    if (
      !movesDiagonal(piece.position, newPosition) ||
      !diagonalFreeMovement(piece, newPosition, board)
    )
      return false;
  }

  if (piece.type === "rook") {
    // check if the move is horizontal or vertical and free of other pieces
    if (
      !movesStraight(piece.position, newPosition) ||
      !straightFreeMovement(piece, newPosition, board)
    )
      return false;
  }

  if (piece.type === "queen") {
    // check if the move is diagonal or horizontal/vertical and free of other pieces
    if (
      !movesDiagonal(piece.position, newPosition) ||
      !diagonalFreeMovement(piece, newPosition, board)
    )
      if (
        !movesStraight(piece.position, newPosition) ||
        !straightFreeMovement(piece, newPosition, board)
      )
        return false;
  }

  if (piece.type === "king") {
    // check if the move is only one field away
    if (
      Math.abs(piece.position.row - newPosition.row) > 1 ||
      Math.abs(piece.position.col - newPosition.col) > 1
    )
      return false;

    // check if the move is diagonal or horizontal/vertical and free of other pieces
    if (
      !movesDiagonal(piece.position, newPosition) ||
      !diagonalFreeMovement(piece, newPosition, board)
    )
      if (
        !movesStraight(piece.position, newPosition) ||
        !straightFreeMovement(piece, newPosition, board)
      )
        return false;

    // TODO: check if the king is in check
    // TODO: check if the king is in checkmate
    // TODO: check if king move to checked field
  }

  if (piece.type === "knight") {
    // check if the move is L-shaped
    if (
      Math.abs(piece.position.row - newPosition.row) !== 2 ||
      Math.abs(piece.position.col - newPosition.col) !== 1
    )
      if (
        Math.abs(piece.position.row - newPosition.row) !== 1 ||
        Math.abs(piece.position.col - newPosition.col) !== 2
      )
        return false;
  }

  if (piece.type === "pawn") {
    // check if the move is straight by one field otherwise return false
    if (piece.position.row !== newPosition.row) return false;
    if (piece.color === "white") {
      if (newPosition.col - piece.position.col !== 1) return false;
    } else {
      if (piece.position.col - newPosition.col !== 1) return false;
    }

    // check if there is any piece on the field the pawn wants to move to
    if (
      board.some(
        (p) =>
          p.position.row === newPosition.row &&
          p.position.col === newPosition.col
      )
    ) {
      return false;
    }

    // TODO: implement double move for the first move
    // TODO: implement hitting enemy piece
  }

  // TODO: Castling
  // TODO: En passant
  // TODO: Promotion

  // check if the destination is empty or has an enemy piece
  if (fieldOccupiedByColor(piece.color, newPosition, board)) return false;
  return true;
};
