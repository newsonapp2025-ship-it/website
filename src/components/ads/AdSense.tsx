import { useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { pushAdUnit, whenAdSenseReady } from "@/lib/adsense";

export const AD_CLIENT = "ca-pub-6015484156094454";
export const DEFAULT_AD_SLOT = "7607056101";

const isLocalDev =
  import.meta.env.DEV ||
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

interface AdSenseProps {
  slot?: string;
  format?: "auto" | "rectangle" | "vertical" | "horizontal";
  fullWidthResponsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  label?: boolean;
  /** Stagger multiple units on the same page (ms) */
  delay?: number;
}

const AdSense = ({
  slot = DEFAULT_AD_SLOT,
  format = "auto",
  fullWidthResponsive = true,
  className,
  style,
  label = true,
  delay = 0,
}: AdSenseProps) => {
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useLayoutEffect(() => {
    const ins = insRef.current;
    if (!ins) return;

    let cancelled = false;

    const tryPush = () => {
      if (cancelled || pushed.current || !insRef.current) return;
      if (insRef.current.getAttribute("data-adsbygoogle-status") === "done") return;

      pushAdUnit();
      pushed.current = true;
    };

    const start = async () => {
      await whenAdSenseReady();
      if (cancelled) return;

      window.setTimeout(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(tryPush);
        });
      }, delay);
    };

    void start();

    return () => {
      cancelled = true;
    };
  }, [slot, delay]);

  return (
    <div className={cn("ad-slot flex w-full flex-col items-center", className)}>
      {label && (
        <span className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
          Advertisement
        </span>
      )}
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block", minHeight: 90, width: "100%", ...style }}
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
