declare global {
  interface Window {
    adsbygoogle?: unknown[];
    __adsenseReady?: Promise<void>;
  }
}

/** Wait until page + AdSense script are fully ready (required for SPAs). */
export function whenAdSenseReady(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  if (window.__adsenseReady) return window.__adsenseReady;

  window.__adsenseReady = new Promise<void>((resolve) => {
    const finish = () => window.setTimeout(resolve, 150);

    const scriptLoaded = () => {
      const script = document.getElementById("adsense-script");
      return script?.getAttribute("data-loaded") === "true";
    };

    const tryFinish = () => {
      if (document.readyState === "complete" && scriptLoaded()) {
        finish();
      }
    };

    tryFinish();

    window.addEventListener("load", tryFinish, { once: true });

    const script = document.getElementById("adsense-script");
    script?.addEventListener("load", tryFinish, { once: true });

    // Safety fallback
    window.setTimeout(finish, 8000);
  });

  return window.__adsenseReady;
}

export function pushAdUnit(): void {
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch (error) {
    console.warn("[AdSense] push failed:", error);
  }
}
