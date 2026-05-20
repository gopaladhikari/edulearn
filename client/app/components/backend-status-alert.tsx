import { useEffect } from "react";
import { CheckCircle2, RefreshCcw, Server, WifiOff } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { api } from "~/lib/axios";
import { cn } from "~/lib/utils";
import { useBackendStatusStore } from "~/store/backend-status-store";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function checkBackendHealth() {
  await api.get("/health", {
    timeout: 7000,
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

  const checkBackend = async () => {
    setStatus("checking");

    const delays = [20000, 15000, 10000, 5000, 4000, 3000, 2000, 1000]; // 1 min

    for (const delay of delays) {
      try {
        await checkBackendHealth();

        setStatus("ready");
        setHasChecked(true);
        setLastCheckedAt(Date.now());

        setTimeout(() => {
          setStatus("idle");
        }, 2500);

        return;
      } catch {
        await sleep(delay);
      }
    }

    setStatus("failed");
    setHasChecked(true);
    setLastCheckedAt(Date.now());
  };

  useEffect(() => {
    const fiveMinutes = 5 * 60 * 1000;

    const recentlyChecked =
      lastCheckedAt && Date.now() - lastCheckedAt < fiveMinutes;

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
                  The backend may take a few seconds to start.
                </p>
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
