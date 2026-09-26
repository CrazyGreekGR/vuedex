const cache = new Map()

export function trimSprite(url) {
  if (!url) return Promise.resolve(url)
  if (cache.has(url)) return cache.get(url)

  const promise = new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous' // needed if sprites come from an external host (e.g. PokeAPI raw.githubusercontent)
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)

      let data
      try {
        data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
      } catch (e) {
        // CORS-tainted canvas, can't read pixels — fall back to original image
        resolve(url)
        return
      }

      let top = canvas.height,
        bottom = 0,
        left = canvas.width,
        right = 0
      const alphaThreshold = 8 // treat near-invisible pixels as transparent too

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const alpha = data[(y * canvas.width + x) * 4 + 3]
          if (alpha > alphaThreshold) {
            if (y < top) top = y
            if (y > bottom) bottom = y
            if (x < left) left = x
            if (x > right) right = x
          }
        }
      }

      if (right < left || bottom < top) {
        // fully transparent image, nothing to trim
        resolve(url)
        return
      }

      const trimmedW = right - left + 1
      const trimmedH = bottom - top + 1

      const out = document.createElement('canvas')
      out.width = trimmedW
      out.height = trimmedH
      out
        .getContext('2d')
        .drawImage(canvas, left, top, trimmedW, trimmedH, 0, 0, trimmedW, trimmedH)

      resolve(out.toDataURL('image/png'))
    }
    img.onerror = reject
    img.src = url
  })

  cache.set(url, promise)
  return promise
}
