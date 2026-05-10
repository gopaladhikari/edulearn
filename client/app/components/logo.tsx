import { Link } from "react-router";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-lg font-bold text-white">
        E
      </div>
      <span className="text-xl font-bold text-foreground">Edulearn</span>
    </Link>
  );
}
