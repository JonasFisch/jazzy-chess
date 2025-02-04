import { ChessColor } from "@/types/chess";
import { Account } from "jazz-tools";

export function PlayerDetails({
  player,
  color,
}: {
  player?: Account | null;
  color: ChessColor;
}) {
  const name = player?.isMe ? "You" : player?.profile?.name;

  return (
    <div className="flex flex-row gap-4 justify-start w-full items-center px-3 sm:px-0">
      <div
        className={` border w-8 h-8 rounded-md ${
          color == "white"
            ? "bg-slate-50 border-slate-300"
            : "bg-slate-700 border-0"
        }`}
      ></div>
      <span>
        {/* name */}
        {player ? name : "?"}
      </span>
    </div>
  );
}
