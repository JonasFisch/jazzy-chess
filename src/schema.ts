import { Account, co, CoMap } from "jazz-tools";

export class Game extends CoMap {
  board_state = co.json<{
    pieces: {
      id: string;
      color: "black" | "white";
      type: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
      position: { row: number; col: number };
    }[];
  }>();
  black = co.optional.ref(Account);
  white = co.optional.ref(Account);
  turn = co.literal("white", "black");
  winner = co.optional.ref(Account);
}
