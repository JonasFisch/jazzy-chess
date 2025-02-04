import { ChessColor } from "@/types/chess";
import { Account } from "jazz-tools";
import { Game } from "./schema";
import { defaultStartBoard } from "./data/board-start-pieces";

export function createGame({
  me,
  color,
}: {
  me: Account;
  color: "random" | ChessColor;
}) {
  const playersColor =
    color === "random" ? (Math.random() < 0.5 ? "white" : "black") : color;

  const game = Game.create({
    white: playersColor === "white" ? me : null,
    black: playersColor === "black" ? me : null,
    board_state: { pieces: defaultStartBoard },
    turn: "white",
  });
  return game;
}
