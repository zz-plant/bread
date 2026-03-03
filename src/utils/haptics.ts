import { WebHaptics } from 'web-haptics';

const INTERACTIVE_SELECTOR = [
  'a[href]',
  'button',
  'summary',
  'input[type="button"]',
  'input[type="submit"]',
  '[role="button"]'
].join(',');

export const enableHapticNavigation = (): void => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  if (!WebHaptics.isSupported) return;

  const haptics = new WebHaptics();

  const onPointerDown = (event: PointerEvent): void => {
    if (event.pointerType !== 'touch') return;

    const target = event.target;
    if (!(target instanceof Element)) return;

    const interactive = target.closest(INTERACTIVE_SELECTOR);
    if (!interactive) return;

    void haptics.trigger('nudge', { intensity: 0.35 });
  };

  window.addEventListener('pointerdown', onPointerDown, { passive: true });
  window.addEventListener(
    'beforeunload',
    () => {
      window.removeEventListener('pointerdown', onPointerDown);
      haptics.destroy();
    },
    { once: true }
  );
};
