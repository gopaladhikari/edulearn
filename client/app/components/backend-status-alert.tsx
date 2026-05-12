import { useEffect, useRef, useState, useEffectEvent } from "react";
import { CheckCircle2, RefreshCcw, Server, WifiOff } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { api } from "~/lib/axios";
import { cn } from "~/lib/utils";

type BackendStatus = "idle" | "checking" | "ready" | "failed";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function checkBackendHealth() {
  await api.get("/health");
}

export function BackendStatusAlert() {
  const hasChecked = useRef(false);

  const [status, setStatus] = useState<BackendStatus>("idle");
  const [attempt, setAttempt] = useState(0);

  const checkBackend = useEffectEvent(async () => {
    setStatus("checking");

    const delays = [6000, 8000, 10000];

    for (let i = 0; i < delays.length; i++) {
      try {
        setAttempt(i + 1);

        await checkBackendHealth();

        setStatus("ready");

        setTimeout(() => {
          setStatus("idle");
        }, 2500);

        return;
      } catch {
        await sleep(delays[i]);
      }
    }

    setStatus("failed");
  });

  useEffect(() => {
    if (hasChecked.current) return;

    hasChecked.current = true;

    checkBackend();
  }, []);

  if (status === "idle") return null;

  return (
    <div className="fixed right-4 bottom-4 z-50 w-[calc(100%-2rem)] max-w-sm">
      <Card
        className={cn(
          "border-border bg-card/95 p-4 shadow-xl backdrop-blur transition-all",
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
                  Free backend is starting. Attempt {attempt}/5...
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
