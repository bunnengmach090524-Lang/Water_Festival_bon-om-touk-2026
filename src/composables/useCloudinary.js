/** Cloudinary URL helpers. No media is bundled with the site. */
const configured = (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '').trim()
export const cloudName = configured && configured !== 'your_cloud_name' ? configured : ''
export const hasCloudinary = Boolean(cloudName)

export function imageUrl(publicId, width = 800) {
  if (!hasCloudinary || !publicId) return ''
  const safeWidth = Math.max(1, Math.round(Number(width) || 800))
  return `https://res.cloudinary.com/${encodeURIComponent(cloudName)}/image/upload/f_auto,q_auto,w_${safeWidth}/${publicId}`
}

export function limitedImageUrl(publicId) {
  if (!hasCloudinary || !publicId) return ''
  return `https://res.cloudinary.com/${encodeURIComponent(cloudName)}/image/upload/w_1600,c_limit,q_auto:good,f_auto/${publicId}`
}

export function imageSrcSet(publicId, widths = [320, 640, 960, 1280]) {
  if (!hasCloudinary || !publicId) return ''
  return widths.map((width) => `${imageUrl(publicId, width)} ${width}w`).join(', ')
}

export function videoUrl(publicId) {
  if (!hasCloudinary || !publicId) return ''
  return `https://res.cloudinary.com/${encodeURIComponent(cloudName)}/video/upload/f_auto,q_auto/${publicId}`
}

export function videoPosterUrl(publicId) {
  if (!hasCloudinary || !publicId) return ''
  return `https://res.cloudinary.com/${encodeURIComponent(cloudName)}/video/upload/so_0,f_auto,q_auto/${publicId}.jpg`
}

/** Cloudinary serves audio through /video/upload/ — same delivery domain. */
export function audioUrl(publicId) {
  if (!hasCloudinary || !publicId) return ''
  return `https://res.cloudinary.com/${encodeURIComponent(cloudName)}/video/upload/f_auto,q_auto/${publicId}`
}
