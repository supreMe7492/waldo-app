import { API_URL } from "./ApiConfig";

export default async function GameStart(imgId) {
  const response = await fetch(`${API_URL}/game/start/${imgId}`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();
  return data;
}
