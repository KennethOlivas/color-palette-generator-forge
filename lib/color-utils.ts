// Color utility functions for palette generation and manipulation

export interface Color {
  hex: string;
  hsl: { h: number; s: number; l: number };
  locked: boolean;
}

// Convert HEX to HSL
/**
 * Converts a hex color string to its HSL (Hue, Saturation, Lightness) representation.
 *
 * @param hex - The hex color string (e.g., "#ff0000" or "ff0000").
 * @returns An object containing the HSL values:
 * - `h`: Hue, in degrees [0, 360]
 * - `s`: Saturation, as a percentage [0, 100]
 * - `l`: Lightness, as a percentage [0, 100]
 *
 * If the input is not a valid hex color, returns `{ h: 0, s: 0, l: 0 }`.
 */
export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { h: 0, s: 0, l: 0 };

  const r = Number.parseInt(result[1], 16) / 255;
  const g = Number.parseInt(result[2], 16) / 255;
  const b = Number.parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// Convert HSL to HEX
export function hslToHex(h: number, s: number, l: number): string {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Generate a random color
export function generateRandomColor(): Color {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 60) + 40; // 40-100%
  const l = Math.floor(Math.random() * 50) + 25; // 25-75%
  const hex = hslToHex(h, s, l);

  return {
    hex,
    hsl: { h, s, l },
    locked: false,
  };
}

// Generate a palette of n colors
export function generatePalette(
  count: number,
  existingColors?: Color[],
): Color[] {
  const palette: Color[] = [];

  for (let i = 0; i < count; i++) {
    if (existingColors && existingColors[i]?.locked) {
      palette.push(existingColors[i]);
    } else {
      palette.push(generateRandomColor());
    }
  }

  return palette;
}

// Get contrasting text color (black or white) for a given background
export function getContrastColor(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "#000000";

  const r = Number.parseInt(result[1], 16);
  const g = Number.parseInt(result[2], 16);
  const b = Number.parseInt(result[3], 16);

  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

// Validate HEX color
export function isValidHex(hex: string): boolean {
  return /^#?([a-f\d]{6})$/i.test(hex);
}
