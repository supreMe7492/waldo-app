import { API_URL } from "./ApiConfig";

export default async function CompleteGame(playerName) {
  const response = await fetch(`${API_URL}/game/complete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ playerName }),
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Unable to save score");
  }

  return data;
}
