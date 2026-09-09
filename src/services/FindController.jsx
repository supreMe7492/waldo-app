export default async function CheckFound(chId, cordsx, cordsy) {
  const reqBody = { chId, cordsx, cordsy };
  const response = await fetch("http://localhost:3000/game/guess", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
    credentials: "include",
  });

  const data = await response.json();
  return data;
}
