"use client";

import { Board } from "@/components/board";
import { boardStartPieces } from "@/data/board-start-pieces";
import { useState } from "react";

export default function Home() {
  const [orientation, setOrientation] = useState<"black" | "white">("white");

  return (
    <div className="flex flex-col items-center justify-between min-h-screen sm:p-8 pb-4 gap-16 w-full overflow-hidden">
      <header className="row-start-1">
        <h1 className="text-2xl font-bold">JazzyChess</h1>
        <button
          onClick={() =>
            setOrientation(orientation === "black" ? "white" : "black")
          }
        >
          flip
        </button>
      </header>
      <main className="flex flex-col gap-8 row-start-2 w-full">
        Board
        <Board orientation={orientation} pieces={boardStartPieces} />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        footer
      </footer>
    </div>
  );
}
