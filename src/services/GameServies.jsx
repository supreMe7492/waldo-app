export default async function GameStart(imgId) {
  const response = await fetch(`http://localhost:3000/game/start/${imgId}`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();
  return data;
}
