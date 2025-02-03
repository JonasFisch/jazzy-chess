export interface Position {
  row: number;
  col: number;
}

export interface PieceType {
  id: string;
  color: "black" | "white";
  type: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
  position: Position;
}
