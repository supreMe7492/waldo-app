import { API_URL } from "./ApiConfig";

export default async function ImageService(id) {
  if (!id) {
    const response = await fetch(`${API_URL}/img`, {
      method: "GET",
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || "Unable to load images");
    }

    return data;
  } else {
    const response = await fetch(`${API_URL}/img/${id}`, {
      method: "GET",
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || "Unable to load image");
    }

    return data;
  }
}
