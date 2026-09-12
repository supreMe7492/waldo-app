export const API_URL = import.meta.env.VITE_API_URL;

export function getImageUrl(path) {
  return path.startsWith("http") ? path : `${API_URL}${path}`;
}
