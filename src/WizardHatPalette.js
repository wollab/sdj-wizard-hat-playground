import { useEffect, useState } from "react";

// Each category uses a verified card from the official 50-card Wizard Hat Atlas.
// The accent is sampled from that very card's artwork, not an invented palette.
// Group labels always show the source card as an explicit visual reference.
export const CARD_SAMPLES = {
  Conflict: 1,
  Order: 5,
  "Win Condition": 16,
  "End Trigger": 9,
  Touch: 17,
  Asset: 40,
  Strategy: 31,
  Twist: 42,
  Engage: 24,
};

// Asset is the blue card family. Pin its visual accent so image sampling cannot turn it green.
const CATEGORY_COLOR_OVERRIDES = Object.freeze({ Asset: "#298DD0" });

export const CORE_CATEGORIES = ["Conflict", "Order", "Win Condition", "End Trigger"];
export const TASTE_CATEGORIES = ["Touch", "Asset", "Strategy", "Twist", "Engage"];

export function cardImage(category) {
  const id = CARD_SAMPLES[category];
  if (!id) return "";
  return import.meta.env.BASE_URL + "wizard-cards/card-" + String(id).padStart(3, "0") + ".png";
}

function sampleAccent(img) {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 90;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.drawImage(img, 0, 0, 64, 90);
  const pixels = ctx.getImageData(0, 0, 64, 90).data;
  const hueBuckets = Array.from({ length: 24 }, () => ({ score: 0, r: 0, g: 0, b: 0, weight: 0 }));
  for (let y = 2; y < 88; y += 2) {
    for (let x = 2; x < 62; x += 2) {
      const i = (y * 64 + x) * 4;
      if (pixels[i + 3] < 230) continue;
      const r = pixels[i] / 255, g = pixels[i + 1] / 255, b = pixels[i + 2] / 255;
      const high = Math.max(r, g, b), low = Math.min(r, g, b), spread = high - low;
      const light = (high + low) / 2;
      if (spread < 0.14 || light < 0.16 || light > 0.91) continue;
      let hue = 0;
      if (high === r) hue = ((g - b) / spread) % 6;
      else if (high === g) hue = (b - r) / spread + 2;
      else hue = (r - g) / spread + 4;
      hue = ((hue * 60) + 360) % 360;
      const bucket = hueBuckets[Math.floor(hue / 15) % 24];
      // Category ink and border occur near the top, bottom and side frame.
      const frame = y < 28 || y > 76 || x < 11 || x > 52;
      const weight = (frame ? 2.6 : 1) * Math.min(1.4, spread * 2.4);
      bucket.score += weight;
      bucket.r += r * weight;
      bucket.g += g * weight;
      bucket.b += b * weight;
      bucket.weight += weight;
    }
  }
  hueBuckets.sort((a, b) => b.score - a.score);
  const winning = hueBuckets[0];
  if (!winning || winning.weight < 3) return null;
  const channel = (value) => Math.max(0, Math.min(255, Math.round(value / winning.weight * 255))).toString(16).padStart(2, "0");
  return "#" + channel(winning.r) + channel(winning.g) + channel(winning.b);
}

export function useWizardHatPalette() {
  const [palette, setPalette] = useState(CATEGORY_COLOR_OVERRIDES);
  useEffect(() => {
    let cancelled = false;
    for (const category of Object.keys(CARD_SAMPLES)) {
      if (CATEGORY_COLOR_OVERRIDES[category]) continue;
      const img = new Image();
      img.onload = () => {
        try {
          const color = sampleAccent(img);
          if (color && !cancelled) setPalette((prev) => ({ ...prev, [category]: color }));
        } catch (_) {
          // Keep the neutral fallback and source-card thumbnails if canvas is unavailable.
        }
      };
      img.src = cardImage(category);
    }
    return () => { cancelled = true; };
  }, []);
  return palette;
}
