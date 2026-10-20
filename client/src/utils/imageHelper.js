/**
 * Resolves an image URL whether it is:
 * - A full external URL (http://... or https://...)
 * - A local uploaded path (/uploads/projects/... or uploads/projects/...)
 * - A blob URL (local preview)
 * - Empty / null fallback
 */
export const getImageUrl = (src, fallback = "") => {
  if (!src) return fallback;
  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("blob:") ||
    src.startsWith("data:")
  ) {
    return src;
  }
  const clean = src.startsWith("/") ? src : `/${src}`;
  return clean;
};

export default getImageUrl;
