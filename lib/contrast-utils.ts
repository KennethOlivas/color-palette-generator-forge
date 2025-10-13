export interface ContrastResult {
  ratio: number;
  aa: {
    normal: boolean;
    large: boolean;
  };
  aaa: {
    normal: boolean;
    large: boolean;
  };
}

// Calculate relative luminance
function getLuminance(hex: string): number {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return 0;

  const r = Number.parseInt(result[1], 16) / 255;
  const g = Number.parseInt(result[2], 16) / 255;
  const b = Number.parseInt(result[3], 16) / 255;

  const [rs, gs, bs] = [r, g, b].map((c) => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio between two colors
export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

// Check WCAG compliance
export function checkContrast(
  foreground: string,
  background: string,
): ContrastResult {
  const ratio = getContrastRatio(foreground, background);

  return {
    ratio,
    aa: {
      normal: ratio >= 4.5, // AA for normal text (4.5:1)
      large: ratio >= 3, // AA for large text (3:1)
    },
    aaa: {
      normal: ratio >= 7, // AAA for normal text (7:1)
      large: ratio >= 4.5, // AAA for large text (4.5:1)
    },
  };
}

// Suggest accessible alternatives by adjusting lightness
/**
 * Suggests an accessible foreground color by adjusting the luminance of the given color
 * until the contrast ratio with the background meets or exceeds the target ratio.
 *
 * The function attempts to lighten or darken the foreground color depending on the
 * luminance of the background, using a stepwise approach. If a suitable color is found
 * within the maximum number of iterations, it returns the new color in hex format.
 * Otherwise, it returns `null`.
 *
 * @param foreground - The initial foreground color in hex format (e.g., "#RRGGBB").
 * @param background - The background color in hex format (e.g., "#RRGGBB").
 * @param targetRatio - The desired minimum contrast ratio (default is 4.5).
 * @returns A hex string representing the suggested accessible color, or `null` if none found.
 */
export function suggestAccessibleColor(
  foreground: string,
  background: string,
  targetRatio = 4.5,
): string | null {
  const bgLum = getLuminance(background);

  // Try adjusting the foreground color
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(foreground);
  if (!result) return null;

  let r = Number.parseInt(result[1], 16);
  let g = Number.parseInt(result[2], 16);
  let b = Number.parseInt(result[3], 16);

  // Determine if we need to go lighter or darker
  const fgLum = getLuminance(foreground);
  const shouldBeLighter = bgLum > fgLum;

  // Binary search for the right luminance
  const step = shouldBeLighter ? 10 : -10;
  let iterations = 0;
  const maxIterations = 50;

  while (iterations < maxIterations) {
    r = Math.max(0, Math.min(255, r + step));
    g = Math.max(0, Math.min(255, g + step));
    b = Math.max(0, Math.min(255, b + step));

    const testHex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    const ratio = getContrastRatio(testHex, background);

    if (ratio >= targetRatio) {
      return testHex;
    }

    iterations++;
  }

  return null;
}
