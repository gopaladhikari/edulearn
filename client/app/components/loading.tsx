import { Spinner } from "./ui/spinner";

export function Loading() {
  return (
    <div className="flex min-h-[calc(100svh-5rem)] w-full items-center justify-center">
      <Spinner className="h-10 w-10 text-primary" />
    </div>
  );
}
