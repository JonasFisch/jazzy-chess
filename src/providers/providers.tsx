"use client";

import { JazzAndAuth } from "./jazz";

export function Providers({ children }: { children: React.ReactNode }) {
  return <JazzAndAuth>{children}</JazzAndAuth>;
}
