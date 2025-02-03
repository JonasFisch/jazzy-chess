export interface PieceType {
  id: string;
  color: "black" | "white";
  type: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
  position: {
    row: number;
    col: number;
  };
}
