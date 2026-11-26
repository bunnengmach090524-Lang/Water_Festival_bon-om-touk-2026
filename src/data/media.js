export const galleryCategories = ['all', 'night', 'river', 'temples', 'city']

export const galleryImages = [
  { id: 'gallery-01', type: 'image', publicId: 'pub-street-siem-reap-night-01', category: 'night', captionKey: 'gallery.captions.gallery-01' },
  { id: 'gallery-02', type: 'image', publicId: 'phnom-penh-riverfront', category: 'river', captionKey: 'gallery.captions.gallery-02' },
  { id: 'gallery-03', type: 'image', publicId: 'koh-pich-diamond-island-01', category: 'night', captionKey: 'gallery.captions.gallery-03' },
  { id: 'gallery-04', type: 'image', publicId: 'angkor-wat-01', category: 'temples', captionKey: 'gallery.captions.gallery-04' },
  { id: 'gallery-05', type: 'image', publicId: 'siem-reap-river-02', category: 'night', captionKey: 'gallery.captions.gallery-05' },
  { id: 'gallery-06', type: 'image', publicId: 'independence-monument-phnom-penh-01', category: 'city', captionKey: 'gallery.captions.gallery-06' },
  { id: 'gallery-07', type: 'image', publicId: 'kampot-river-01', category: 'river', captionKey: 'gallery.captions.gallery-07' },
  { id: 'gallery-08', type: 'image', publicId: 'bayon-temple-03', category: 'temples', captionKey: 'gallery.captions.gallery-08' },
  { id: 'gallery-09', type: 'image', publicId: 'kampong-cham-mekong-01', category: 'night', captionKey: 'gallery.captions.gallery-09' },
  { id: 'gallery-10', type: 'image', publicId: 'wat-phnom-01', category: 'city', captionKey: 'gallery.captions.gallery-10' },
]

export const galleryVideos = [
  { id: 'video-01', type: 'video', publicId: 'bon-om-touk/video-01', category: 'river', captionKey: 'gallery.captions.video-01' },
  { id: 'video-02', type: 'video', publicId: 'bon-om-touk/video-02', category: 'night', captionKey: 'gallery.captions.video-02' },
]

/**
 * Festival music — LEFT EMPTY ON PURPOSE.
 * When you upload a song to Cloudinary, add one entry here:
 *   { id: 'theme-song', publicId: 'bon-om-touk/audio/your-song-file', titleKey: 'music.track.theme' }
 * The publicId must NOT include a file extension. Add the matching titleKey
 * string to all four locale files (km, en, fr, zh). Nothing autoplays.
 */
export const music = []
