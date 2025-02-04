"use client";

import { createGame } from "@/actions";
import { Game } from "@/schema";
import { useAcceptInvite, useAccount } from "jazz-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { me } = useAccount();

  useAcceptInvite({
    invitedObjectSchema: Game,
    onAccept: async (listID) => {
      const game = await Game.load(listID, me, []);
      if (!game) return console.error("error in after invite accept action");

      if (!game.white) game.white = me;
      else if (!game.black) game.black = me;

      console.log("accept invite", game.id);
      setGame(game);
    },
    forValueHint: "game",
  });

  const [game, setGame] = useState<Game | undefined>(undefined);
  useEffect(() => {
    if (game) redirect(`/game/${game.id}`);
  }, [game]);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen sm:p-8 pb-4 gap-16 w-full overflow-hidden">
      <header className="row-start-1">
        <h1 className="text-2xl font-bold">JazzyChess</h1>
      </header>
      <main className="flex flex-col items-center gap-8 row-start-2 w-full">
        <button
          onClick={() => {
            const game = createGame({ me: me, color: "random" });
            redirect(`/game/${game.id}`);
          }}
          className="px-4 py-2 border-indigo-500 border-1 border text-indigo-500 rounded-md transition-all cursor-pointer hover:bg-indigo-50 active:bg-indigo-100"
        >
          create new game
        </button>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        footer
      </footer>
    </div>
  );
}
