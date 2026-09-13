/**
 * Geteilte Bildsequenz-Ladelogik.
 *
 * Ursprünglich Teil von `hero-portal.tsx` (Akt I). Hierher ausgelagert, damit
 * die Werkstatt (`/werkstatt`) denselben Nachlade-Mechanismus (nächstgelegener
 * Frame zuerst, max. 4 parallele Downloads) für ihr eigenes Scroll-Intro nutzen
 * kann, ohne die Logik zu duplizieren. Das Zeichnen selbst (Canvas-Fit, Zoom,
 * Fade) bleibt bewusst bei den jeweiligen Komponenten — nur das Laden/Auswählen
 * von Frames ist hier geteilt.
 */

export type FrameSet = { dir: string; count: number };

export type ImageSequenceStore = {
  kind: string;
  images: (HTMLImageElement | null)[];
  inflight: number;
  target: number;
};

export function createImageStore(): ImageSequenceStore {
  return { kind: "", images: [], inflight: 0, target: 0 };
}

export function frameSrc(set: FrameSet, index: number) {
  return `${set.dir}/${String(index + 1).padStart(4, "0")}.webp`;
}

/** Legt den Bildspeicher neu an, wenn sich die Sequenz-Art ändert (z. B. Desktop/Mobile). */
export function ensureKind(store: ImageSequenceStore, kind: string, count: number) {
  if (store.kind !== kind) {
    store.kind = kind;
    store.images = new Array(count).fill(null);
    store.inflight = 0;
  }
}

/** Lädt Frames nach, immer die nächstgelegenen zum aktuellen `target` zuerst, max. 4 parallel. */
export function pumpFrames(store: ImageSequenceStore, set: FrameSet, onLoaded: () => void) {
  while (store.inflight < 4) {
    let next = -1;
    let best = Infinity;
    for (let i = 0; i < store.images.length; i += 1) {
      if (store.images[i]) continue;
      const d = Math.abs(i - store.target);
      if (d < best) {
        best = d;
        next = i;
      }
    }
    if (next < 0) return;
    const index = next;
    const img = new window.Image();
    store.images[index] = img; // Platz reservieren, damit er nicht doppelt geladen wird
    store.inflight += 1;
    img.decoding = "async";
    img.onload = () => {
      store.inflight -= 1;
      onLoaded();
      pumpFrames(store, set, onLoaded);
    };
    img.onerror = () => {
      store.inflight -= 1;
    };
    img.src = frameSrc(set, index);
  }
}

/** Liefert den geladenen Frame, der `target` am nächsten liegt (oder null). */
export function nearestLoadedFrame(store: ImageSequenceStore): HTMLImageElement | null {
  let best: HTMLImageElement | null = null;
  let delta = Infinity;
  for (let i = 0; i < store.images.length; i += 1) {
    const img = store.images[i];
    if (!img || !img.naturalWidth) continue;
    const d = Math.abs(i - store.target);
    if (d < delta) {
      delta = d;
      best = img;
    }
  }
  return best;
}
