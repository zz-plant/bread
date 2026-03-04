const INTERACTIVE_SELECTOR = [
  "a[href]",
  "button",
  "summary",
  'input[type="button"]',
  'input[type="submit"]',
  '[role="button"]',
].join(",");

const supportsVibration = (): boolean =>
  typeof navigator !== "undefined" && typeof navigator.vibrate === "function";

const triggerNudge = (): void => {
  if (!supportsVibration()) return;

  navigator.vibrate(12);
};

export const enableHapticNavigation = (): void => {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (!supportsVibration()) return;

  const onPointerDown = (event: PointerEvent): void => {
    if (event.pointerType !== "touch") return;

    const target = event.target;
    if (!(target instanceof Element)) return;

    const interactive = target.closest(INTERACTIVE_SELECTOR);
    if (!interactive) return;

    triggerNudge();
  };

  window.addEventListener("pointerdown", onPointerDown, { passive: true });
  window.addEventListener(
    "beforeunload",
    () => {
      window.removeEventListener("pointerdown", onPointerDown);
    },
    { once: true },
  );
};
