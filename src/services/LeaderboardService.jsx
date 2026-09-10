export default async function GetLeaderboard(imgId) {
  const response = await fetch(
    `http://localhost:3000/leaderboard/image/${imgId}`,
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to load leaderboard");
  }

  return data.data;
}
