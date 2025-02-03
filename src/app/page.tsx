export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen sm:p-8 pb-4 gap-16 w-full overflow-hidden">
      <header className="row-start-1">
        <h1 className="text-2xl font-bold">JazzyChess</h1>
      </header>
      <main className="flex flex-col gap-8 row-start-2 ">Board</main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        footer
      </footer>
    </div>
  );
}
