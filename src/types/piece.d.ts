export interface Position {
  row: number;
  col: number;
}

export type PieceType = {
  id: string;
  color: "black" | "white";
  type: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
  position: Position;
};
