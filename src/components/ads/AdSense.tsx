import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    adsbygoogle?: { push: (config: Record<string, never>) => void } & unknown[];
  }
}

export const AD_CLIENT = "ca-pub-6015484156094454";
export const DEFAULT_AD_SLOT = "7607056101";

const isLocalDev =
  import.meta.env.DEV ||
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

function waitForAdSenseScript(maxWaitMs = 8000): Promise<void> {
  return new Promise((resolve) => {
    const start = Date.now();

    const check = () => {
      if (window.adsbygoogle?.push) {
        resolve();
        return;
      }
      if (Date.now() - start >= maxWaitMs) {
        resolve();
        return;
      }
      window.setTimeout(check, 50);
    };

    check();
  });
}

interface AdSenseProps {
  slot?: string;
  format?: "auto" | "rectangle" | "vertical" | "horizontal";
  fullWidthResponsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  label?: boolean;
}

const AdSense = ({
  slot = DEFAULT_AD_SLOT,
  format = "auto",
  fullWidthResponsive = true,
  className,
  style,
  label = true,
}: AdSenseProps) => {
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const instanceId = useId();

  useEffect(() => {
    const ins = insRef.current;
    if (!ins || pushed.current) return;

    let cancelled = false;

    const load = async () => {
      await waitForAdSenseScript();
      if (cancelled || !insRef.current || pushed.current) return;

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed.current = true;
      } catch (error) {
        console.warn("[AdSense] push failed:", error);
      }
    };

    // Double rAF ensures layout is complete before Google measures the slot
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        void load();
      });
    });

    return () => {
      cancelled = true;
    };
  }, [slot, instanceId]);

  return (
    <div className={cn("flex w-full flex-col items-center", className)}>
      {label && (
        <span className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
          Advertisement
        </span>
      )}
      <ins
        ref={insRef}
        key={instanceId}
        className="adsbygoogle block w-full overflow-hidden"
        style={{ display: "block", minHeight: 90, ...style }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
        {...(isLocalDev ? { "data-adtest": "on" } : {})}
      />
    </div>
  );
};

export default AdSense;
