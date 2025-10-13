export interface ExtractedColor {
  hex: string
  count: number
  percentage: number
}

// Convert RGB to HEX
/**
 * Converts RGB color values to a hexadecimal color string.
 *
 * @param r - The red component of the color (0-255).
 * @param g - The green component of the color (0-255).
 * @param b - The blue component of the color (0-255).
 * @returns The hexadecimal color string in the format `#RRGGBB`.
 */
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (x: number) => {
    const hex = Math.round(x).toString(16)
    return hex.length === 1 ? "0" + hex : hex
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

// Calculate color distance
/**
 * Calculates the Euclidean distance between two RGB color vectors.
 *
 * @param c1 - The first color as an array of three numbers [R, G, B].
 * @param c2 - The second color as an array of three numbers [R, G, B].
 * @returns The Euclidean distance between the two colors.
 */
function colorDistance(c1: number[], c2: number[]): number {
  return Math.sqrt(Math.pow(c1[0] - c2[0], 2) + Math.pow(c1[1] - c2[1], 2) + Math.pow(c1[2] - c2[2], 2))
}

// K-means clustering for color extraction
/**
 * Extracts the dominant colors from an image file using k-means clustering.
 *
 * @param imageFile - The image file to extract colors from.
 * @param colorCount - The number of dominant colors to extract (default is 5).
 * @returns A promise that resolves to an array of extracted colors, each containing the hex value, count, and percentage.
 *
 * @throws {Error} If the image cannot be loaded or the file cannot be read.
 *
 * @example
 * ```typescript
 * const colors = await extractColorsFromImage(file, 5);
 * // colors: [{ hex: "#aabbcc", count: 123, percentage: 12.3 }, ...]
 * ```
 */
export async function extractColorsFromImage(imageFile: File, colorCount = 5): Promise<ExtractedColor[]> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const reader = new FileReader()

    reader.onload = (e) => {
      img.onload = () => {
        try {
          // Create canvas and get image data
          const canvas = document.createElement("canvas")
          const ctx = canvas.getContext("2d")
          if (!ctx) {
            reject(new Error("Could not get canvas context"))
            return
          }

          // Resize image for faster processing
          const maxSize = 200
          const scale = Math.min(maxSize / img.width, maxSize / img.height)
          canvas.width = img.width * scale
          canvas.height = img.height * scale

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const pixels: number[][] = []

          // Extract pixel data (skip transparent pixels)
          for (let i = 0; i < imageData.data.length; i += 4) {
            const alpha = imageData.data[i + 3]
            if (alpha > 128) {
              // Skip mostly transparent pixels
              pixels.push([imageData.data[i], imageData.data[i + 1], imageData.data[i + 2]])
            }
          }

          // K-means clustering
          const maxIterations = 10
          let centroids: number[][] = []

          // Initialize centroids randomly
          for (let i = 0; i < colorCount; i++) {
            centroids.push(pixels[Math.floor(Math.random() * pixels.length)])
          }

          // Iterate k-means
          for (let iter = 0; iter < maxIterations; iter++) {
            const clusters: number[][][] = Array.from({ length: colorCount }, () => [])

            // Assign pixels to nearest centroid
            for (const pixel of pixels) {
              let minDist = Number.POSITIVE_INFINITY
              let closestCluster = 0

              for (let i = 0; i < centroids.length; i++) {
                const dist = colorDistance(pixel, centroids[i])
                if (dist < minDist) {
                  minDist = dist
                  closestCluster = i
                }
              }

              clusters[closestCluster].push(pixel)
            }

            // Update centroids
            centroids = clusters.map((cluster) => {
              if (cluster.length === 0) return centroids[0] // Fallback if cluster is empty

              const sum = cluster.reduce(
                (acc, pixel) => [acc[0] + pixel[0], acc[1] + pixel[1], acc[2] + pixel[2]],
                [0, 0, 0],
              )
              return [sum[0] / cluster.length, sum[1] / cluster.length, sum[2] / cluster.length]
            })
          }

          // Calculate final results
          const results: ExtractedColor[] = centroids.map((centroid, i) => {
            const count = pixels.filter((pixel) => {
              let minDist = Number.POSITIVE_INFINITY
              let closestIdx = 0
              for (let j = 0; j < centroids.length; j++) {
                const dist = colorDistance(pixel, centroids[j])
                if (dist < minDist) {
                  minDist = dist
                  closestIdx = j
                }
              }
              return closestIdx === i
            }).length

            return {
              hex: rgbToHex(centroid[0], centroid[1], centroid[2]),
              count,
              percentage: (count / pixels.length) * 100,
            }
          })

          // Sort by percentage
          results.sort((a, b) => b.percentage - a.percentage)

          resolve(results)
        } catch (error) {
          reject(error)
        }
      }

      img.onerror = () => reject(new Error("Failed to load image"))
      img.src = e.target?.result as string
    }

    reader.onerror = () => reject(new Error("Failed to read file"))
    reader.readAsDataURL(imageFile)
  })
}
