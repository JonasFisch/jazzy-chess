import { ButtonHTMLAttributes } from "react";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="flex flex-row gap-2 items-center px-4 py-2 border-indigo-500 border-1 border text-indigo-500 rounded-md transition-all cursor-pointer hover:bg-indigo-50 active:bg-indigo-100"
    ></button>
  );
}
