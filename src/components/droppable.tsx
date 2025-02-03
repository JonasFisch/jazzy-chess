import { PieceType, Position } from "@/types/piece";
import { useDroppable } from "@dnd-kit/core";

export function Droppable({
  children,
  id,
  position,
  piece,
}: {
  children: React.ReactNode;
  id: string;
  position: Position;
  piece: PieceType | null;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-${id}`,
    data: {
      position,
      piece,
    },
  });

  return (
    <div
      className={`h-20 w-20 ${isOver ? "bg-green-300" : "bg-yellow-200"}`}
      ref={setNodeRef}
    >
      {children}
    </div>
  );
}
