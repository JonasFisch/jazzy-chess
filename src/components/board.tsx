"use client";

import { PieceType } from "@/types/piece";
import { useEffect, useState } from "react";
import { Piece } from "./piece";
import { getLetterFromNumber } from "@/utils";

export function Board({
  orientation,
  pieces,
}: {
  orientation: "black" | "white";
  pieces: PieceType[];
}) {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
      console.log("setting screen width");
    });
    setScreenWidth(window.innerWidth);
    return removeEventListener("resize", () => {});
  }, []);

  return (
    <div className="grid grid-flow-col grid-rows-8 w-full auto-cols-max justify-center">
      {Array.from({ length: 64 })
        .map((_, i) => i)
        .sort((a, b) => {
          return orientation === "black" ? a - b : b - a;
        })
        .map((i) => {
          const row = Math.floor(i / 8);
          const col = i % 8;
          const isBlack = (row + col) % 2 === 1;
          const piece = pieces.find(
            (piece) => piece.position.row === row && piece.position.col === col
          );
          return (
            <div
              key={i}
              className={`${
                isBlack ? "bg-slate-400" : "bg-slate-300"
              } max-h-20 max-w-20 flex relative`}
              style={{
                height: `${screenWidth / 8}px`,
                width: `${screenWidth / 8}px`,
              }}
            >
              {/* row letter */}
              {col === (orientation === "black" ? 7 : 0) && (
                <div className={`absolute bottom-0.5 left-1 text-xs`}>
                  {getLetterFromNumber(7 - row)}
                </div>
              )}

              {/* col number */}
              {row === (orientation === "black" ? 7 : 0) && (
                <div className="absolute top-0.5 right-1 text-xs">
                  {col + 1}
                </div>
              )}

              {piece && <Piece piece={piece} />}
            </div>
          );
        })}
    </div>
  );
}
