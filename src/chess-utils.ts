import { PieceType } from "@/types/piece";
import { Position } from "./types/piece";
import { ChessColor } from "./types/chess";

const movesDiagonal = (oldPosition: Position, newPosition: Position) => {
  return (
    Math.abs(newPosition.row - oldPosition.row) ===
    Math.abs(newPosition.col - oldPosition.col)
  );
};

const movesStraight = (oldPosition: Position, newPosition: Position) => {
  return (
    oldPosition.row === newPosition.row || oldPosition.col === newPosition.col
  );
};

const getAvailableMovesKnight = (piece: PieceType, board: PieceType[]) => {
  const possibleMoves = [
    { row: piece.position.row + 2, col: piece.position.col + 1 },
    { row: piece.position.row + 2, col: piece.position.col - 1 },
    { row: piece.position.row - 2, col: piece.position.col + 1 },
    { row: piece.position.row - 2, col: piece.position.col - 1 },
    { row: piece.position.row + 1, col: piece.position.col + 2 },
    { row: piece.position.row + 1, col: piece.position.col - 2 },
    { row: piece.position.row - 1, col: piece.position.col + 2 },
    { row: piece.position.row - 1, col: piece.position.col - 2 },
  ];

  return possibleMoves.filter((move) => {
    return isOnBoard(move) && !fieldOccupiedByColor(piece.color, move, board);
  });
};

const getAvailableDiagonalMoves = (
  piece: PieceType,
  board: PieceType[],
  maxDistance: number = 8
) => {
  const possibleMoves = [];

  for (let i = 1; i < maxDistance; i++) {
    possibleMoves.push(
      { row: piece.position.row + i, col: piece.position.col + i },
      { row: piece.position.row + i, col: piece.position.col - i },
      { row: piece.position.row - i, col: piece.position.col + i },
      { row: piece.position.row - i, col: piece.position.col - i }
    );
  }

  return possibleMoves.filter((move) => {
    return (
      isOnBoard(move) &&
      movesDiagonal(piece.position, move) &&
      diagonalFreeMovement(piece, move, board) &&
      !fieldOccupiedByColor(piece.color, move, board)
    );
  });
};

const getAvailableStraightMoves = (
  piece: PieceType,
  board: PieceType[],
  maxDistance = 8
) => {
  const possibleMoves = [];

  for (let i = 1; i < maxDistance; i++) {
    possibleMoves.push(
      { row: piece.position.row + i, col: piece.position.col },
      { row: piece.position.row - i, col: piece.position.col },
      { row: piece.position.row, col: piece.position.col + i },
      { row: piece.position.row, col: piece.position.col - i }
    );
  }

  return possibleMoves.filter((move) => {
    return (
      isOnBoard(move) &&
      movesStraight(piece.position, move) &&
      straightFreeMovement(piece, move, board) &&
      !fieldOccupiedByColor(piece.color, move, board)
    );
  });
};

const getAvailablePawnMoves = (piece: PieceType, board: PieceType[]) => {
  const possibleMoves = [];
  const direction = piece.color === "white" ? 1 : -1;

  // move one field forward
  const moveForward = {
    col: piece.position.col + direction,
    row: piece.position.row,
  };
  if (
    isOnBoard(moveForward) &&
    !fieldOccupiedByColor(piece.color, moveForward, board)
  ) {
    possibleMoves.push(moveForward);
  }

  // move two fields forward
  const moveTwoForward = {
    col: piece.position.col + 2 * direction,
    row: piece.position.row,
  };
  if (
    isOnBoard(moveTwoForward) &&
    !fieldOccupiedByColor(piece.color, moveTwoForward, board) &&
    piece.position.col === (piece.color === "white" ? 1 : 6)
  ) {
    possibleMoves.push(moveTwoForward);
  }

  // capture
  const captureLeft = {
    col: piece.position.col + direction,
    row: piece.position.row - 1,
  };
  if (
    isOnBoard(captureLeft) &&
    !fieldOccupiedByColor(piece.color, captureLeft, board) &&
    // TODO: this does not work accordingly for now!
    fieldOccupiedByColor(getOppositeColor(piece.color), captureLeft, board)
  ) {
    possibleMoves.push(captureLeft);
  }

  const captureRight = {
    col: piece.position.col + direction,
    row: piece.position.row + 1,
  };
  if (
    isOnBoard(captureRight) &&
    !fieldOccupiedByColor(piece.color, captureRight, board) &&
    fieldOccupiedByColor(getOppositeColor(piece.color), captureLeft, board)
  ) {
    possibleMoves.push(captureRight);
  }

  return possibleMoves;
};

const isOnBoard = (move: Position) => {
  return move.row >= 0 && move.row < 8 && move.col >= 0 && move.col < 8;
};

const getOppositeColor = (color: ChessColor) => {
  return color === "white" ? "black" : "white";
};

const getAvailableMoves = (piece: PieceType, board: PieceType[]) => {
  switch (piece.type) {
    case "knight":
      return getAvailableMovesKnight(piece, board);
    case "bishop":
      return getAvailableDiagonalMoves(piece, board);
    case "rook":
      return getAvailableStraightMoves(piece, board);
    case "king":
      return [
        ...getAvailableDiagonalMoves(piece, board, 1),
        ...getAvailableStraightMoves(piece, board, 1),
      ];
    case "queen":
      return [
        ...getAvailableDiagonalMoves(piece, board),
        ...getAvailableStraightMoves(piece, board),
      ];
    case "pawn":
      return getAvailablePawnMoves(piece, board);

    default:
      console.warn("unknown piece type");
      return [];
  }
};

const diagonalFreeMovement = (
  piece: PieceType,
  newPosition: Position,
  board: PieceType[]
) => {
  const rowDirection = newPosition.row > piece.position.row ? 1 : -1;
  const colDirection = newPosition.col > piece.position.col ? 1 : -1;
  for (
    let row = piece.position.row + rowDirection,
      col = piece.position.col + colDirection;
    row !== newPosition.row;
    row += rowDirection, col += colDirection
  ) {
    if (
      board.some(
        (p) => p.position.row === row && p.position.col === col && p !== piece
      )
    ) {
      return false;
    }
  }
  return true;
};

const straightFreeMovement = (
  piece: PieceType,
  newPosition: Position,
  board: PieceType[]
) => {
  if (piece.position.row === newPosition.row) {
    const colDirection = newPosition.col > piece.position.col ? 1 : -1;
    for (
      let col = piece.position.col + colDirection;
      col !== newPosition.col;
      col += colDirection
    ) {
      if (
        board.some(
          (p) => p.position.col === col && p.position.row === piece.position.row
        )
      ) {
        return false;
      }
    }
  } else if (piece.position.col === newPosition.col) {
    const rowDirection = newPosition.row > piece.position.row ? 1 : -1;
    for (
      let row = piece.position.row + rowDirection;
      row !== newPosition.row;
      row += rowDirection
    ) {
      if (
        board.some(
          (p) => p.position.row === row && p.position.col === piece.position.col
        )
      ) {
        return false;
      }
    }
  }
  return true;
};

const fieldOccupiedByColor = (
  color: ChessColor,
  position: Position,
  board: PieceType[]
) => {
  const destinationPiece = board.find(
    (p) => p.position.row === position.row && p.position.col === position.col
  );
  if (destinationPiece && destinationPiece.color === color) {
    return true;
  }
  return false;
};

export {
  movesDiagonal,
  movesStraight,
  diagonalFreeMovement,
  fieldOccupiedByColor,
  straightFreeMovement,
  getAvailableMoves,
};
