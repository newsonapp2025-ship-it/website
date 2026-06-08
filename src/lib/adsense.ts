declare global {
  interface Window {
    adsbygoogle?: unknown[];
    __adsenseReady?: Promise<void>;
  }
}

/** Wait until the AdSense script in index.html has finished loading. */
export function whenAdSenseReady(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  if (window.__adsenseReady) return window.__adsenseReady;

  window.__adsenseReady = new Promise<void>((resolve) => {
    const script = document.getElementById("adsense-script") as HTMLScriptElement | null;

    const done = () => window.setTimeout(resolve, 50);

    if (script?.dataset.loaded === "true") {
      done();
      return;
    }

    script?.addEventListener("load", () => {
      script.dataset.loaded = "true";
      done();
    }, { once: true });

    // Fallback: after full page load the script is almost always ready
    if (document.readyState === "complete") {
      window.setTimeout(resolve, 300);
    } else {
      window.addEventListener("load", done, { once: true });
    }
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
