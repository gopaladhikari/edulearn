import { useEffect, useState } from "react";
import { CheckCircle2, RefreshCcw, Server, WifiOff } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { api } from "~/lib/axios";
import { cn } from "~/lib/utils";
import { useBackendStatusStore } from "~/store/backend-status-store";
import { getCurrentUser } from "~/lib/get-current-user";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type WakeupAttempt = {
  timeoutMs: number;
  delayMs: number;
};

const wakeupAttempts: WakeupAttempt[] = [
  { timeoutMs: 20000, delayMs: 1000 },
  { timeoutMs: 15000, delayMs: 1500 },
  { timeoutMs: 12000, delayMs: 2000 },
  { timeoutMs: 10000, delayMs: 2500 },
  { timeoutMs: 10000, delayMs: 3000 },
  { timeoutMs: 8000, delayMs: 4000 },
];

async function checkBackendHealth(timeoutMs: number) {
  await api.get("/health", {
    timeout: timeoutMs,
  });
}

export function BackendStatusAlert() {
  const status = useBackendStatusStore((state) => state.status);
  const hasChecked = useBackendStatusStore((state) => state.hasChecked);
  const lastCheckedAt = useBackendStatusStore((state) => state.lastCheckedAt);

  const setStatus = useBackendStatusStore((state) => state.setStatus);
  const setHasChecked = useBackendStatusStore((state) => state.setHasChecked);
  const setLastCheckedAt = useBackendStatusStore(
    (state) => state.setLastCheckedAt
  );

  const [attempt, setAttempt] = useState(0);

  const checkBackend = async () => {
    setStatus("checking");
    setAttempt(0);

    for (let index = 0; index < wakeupAttempts.length; index++) {
      const { timeoutMs, delayMs } = wakeupAttempts[index];

      try {
        setAttempt(index + 1);

        await checkBackendHealth(timeoutMs);

        await getCurrentUser();

        setStatus("ready");
        setHasChecked(true);
        setLastCheckedAt(Date.now());

        window.setTimeout(() => {
          setStatus("idle");
        }, 2500);

        return;
      } catch {
        if (index < wakeupAttempts.length - 1) {
          await sleep(delayMs);
        }
      }
    }

    // Only runs after all attempts fail
    setStatus("failed");
    setHasChecked(true);

    // Do not set lastCheckedAt on failure.
    // This allows retry sooner instead of waiting 5 minutes.
  };

  useEffect(() => {
    const fiveMinutes = 5 * 60 * 1000;

    const recentlyChecked =
      lastCheckedAt !== null && Date.now() - lastCheckedAt < fiveMinutes;

    if (hasChecked && recentlyChecked) return;

    checkBackend();
  }, []);

  if (status === "idle") return null;

  return (
    <div className="fixed right-4 bottom-4 z-50 w-[calc(100%-2rem)] max-w-sm">
      <Card
        className={cn(
          "border-border bg-card/95 p-4 shadow-xl backdrop-blur",
          status === "failed" && "border-destructive/40",
          status === "ready" && "border-primary/40"
        )}
      >
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
              status === "checking" && "bg-primary/10 text-primary",
              status === "ready" && "bg-primary/10 text-primary",
              status === "failed" && "bg-destructive/10 text-destructive"
            )}
          >
            {status === "checking" && (
              <Server className="h-5 w-5 animate-pulse" />
            )}

            {status === "ready" && <CheckCircle2 className="h-5 w-5" />}

            {status === "failed" && <WifiOff className="h-5 w-5" />}
          </div>

          <div className="min-w-0 flex-1">
            {status === "checking" && (
              <>
                <h3 className="text-sm font-semibold text-foreground">
                  Waking up server
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Free backend is starting. First load can take 30–60 seconds.
                </p>

                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Checking API</span>
                    <span>
                      Attempt {attempt}/{wakeupAttempts.length}
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{
                        width: `${(attempt / wakeupAttempts.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </>
            )}

            {status === "ready" && (
              <>
                <h3 className="text-sm font-semibold text-foreground">
                  Server is ready
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  API connection is active now.
                </p>
              </>
            )}

            {status === "failed" && (
              <>
                <h3 className="text-sm font-semibold text-foreground">
                  Server not responding
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Backend may still be starting. Try again in a moment.
                </p>

                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={checkBackend}
                  className="mt-3 gap-2"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Retry
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
