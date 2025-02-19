import { PieceType, Position } from "@/types/piece";
import { useDroppable } from "@dnd-kit/core";
import { getLetterFromNumber } from "@/utils";
import { ChessColor } from "@/types/chess";

export function Square({
  id,
  position,
  piece,
  isActive,
  screenWidth,
  orientation,
  children,
  onClick,
  moveablePositions,
}: {
  children: React.ReactNode;
  id: string;
  position: Position;
  piece: PieceType | null;
  isActive: boolean;
  screenWidth: number;
  orientation: ChessColor;
  onClick: () => void;
  moveablePositions: Position[];
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-${id}`,
    data: {
      position,
      piece,
    },
  });

  const isBlack = (position.row + position.col) % 2 === 1;

  return (
    <div className={``} ref={setNodeRef}>
      <div
        className={`${
          isBlack ? "bg-slate-400" : "bg-slate-300"
        } max-h-20 max-w-20 flex relative select-none`}
        style={{
          height: `${screenWidth / 8}px`,
          width: `${screenWidth / 8}px`,
        }}
        onClick={onClick}
      >
        {/* row letter */}
        {position.col === (orientation === "black" ? 7 : 0) && (
          <div className={`absolute bottom-0.5 left-1 text-xs`}>
            {getLetterFromNumber(7 - position.row)}
          </div>
        )}

        {/* col number */}
        {position.row === (orientation === "black" ? 7 : 0) && (
          <div className="absolute top-0.5 right-1 text-xs">
            {position.col + 1}
          </div>
        )}

        {children}

        {/* active and over indicator */}
        {(isActive || isOver) && (
          <div className="z-10 h-full w-full absolute bg-indigo-500/70"></div>
        )}

        {/* moveable indicator */}
        {moveablePositions.some(
          (moveablePosition) =>
            moveablePosition.row === position.row &&
            moveablePosition.col === position.col
        ) && (
          <div className="z-20 h-full w-full absolute flex flex-row justify-center items-center">
            <div className="h-1/3 w-1/3 rounded-full bg-indigo-500/70"></div>
          </div>
        )}
      </div>
    </div>
  );
}
