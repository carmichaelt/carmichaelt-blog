import { logoPixelSize } from "./pipeline";

const LOGO_SVG =
  '<svg width="514" height="624" viewBox="-48 -88 514 624" fill="none" ' +
  'xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#c)">' +
  '<path d="M24.5 12.5H441.5V92.5H24.5V12.5Z" fill="url(#a)" stroke="url(#a)" ' +
  'stroke-width="2" vector-effect="non-scaling-stroke"/>' +
  '<path d="M197.5 12.5H268.5V523.5H197.5V12.5Z" fill="url(#b)" stroke="url(#b)" ' +
  'stroke-width="2" vector-effect="non-scaling-stroke"/></g><defs>' +
  '<linearGradient id="a" x1="24.5" y1="52.5" x2="441.5" y2="52.5" ' +
  'gradientUnits="userSpaceOnUse"><stop stop-color="#EDEDED"/><stop offset=".7" ' +
  'stop-color="#EDEDED"/><stop offset="1" stop-color="#EDEDED" stop-opacity=".35"/>' +
  '</linearGradient><linearGradient id="b" x1="233" y1="12.5" x2="233" y2="523.5" ' +
  'gradientUnits="userSpaceOnUse"><stop stop-color="#EDEDED"/><stop offset=".35" ' +
  'stop-color="#EDEDED"/><stop offset="1" stop-color="#EDEDED" stop-opacity=".15"/>' +
  '</linearGradient><clipPath id="c">' +
  '<path fill="#fff" d="M0 0h466v536H0z"/></clipPath></defs></svg>';

export async function rasterizeLogo(
  size: number,
  signal?: AbortSignal,
): Promise<HTMLCanvasElement> {
  if (signal?.aborted) throw new DOMException("Logo rasterization aborted.", "AbortError");
  const [width, height] = logoPixelSize(size);
  const pad = 3;
  const canvas = document.createElement("canvas");
  canvas.width = width + pad * 2;
  canvas.height = height + pad * 2;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not create the T raster canvas.");
  const image = new Image();
  let abort: (() => void) | undefined;
  const loaded = new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("Could not decode the T glyph SVG."));
    abort = () => {
      image.onload = null;
      image.onerror = null;
      image.src = "";
      reject(new DOMException("Logo rasterization aborted.", "AbortError"));
    };
    signal?.addEventListener("abort", abort, { once: true });
  });
  if (signal?.aborted) abort?.();
  else image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(LOGO_SVG)}`;
  try {
    await loaded;
  } finally {
    image.onload = null;
    image.onerror = null;
    if (abort) signal?.removeEventListener("abort", abort);
  }
  if (signal?.aborted) throw new DOMException("Logo rasterization aborted.", "AbortError");
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(image, pad, pad, width, height);
  return canvas;
}
