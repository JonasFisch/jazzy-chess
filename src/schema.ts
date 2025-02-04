import { Account, co, CoMap } from "jazz-tools";
import { PieceType } from "./types/piece";

export class Game extends CoMap {
  board_state = co.json<{ pieces: PieceType[] }>();
  black = co.optional.ref(Account);
  white = co.optional.ref(Account);
  turn = co.literal("white", "black");
  winner = co.optional.ref(Account);
}
