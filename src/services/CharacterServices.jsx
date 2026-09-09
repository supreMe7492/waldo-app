export default async function GetImgChar(imgId) {
  const response = await fetch(`http://localhost:3000/characters/${imgId}`, {
    method: "GET",
  });

  const chData = await response.json();
  const chIds = chData.data.map((d) => ({
    chId: parseInt(d.id),
    chName: d.name,
  }));

  return chIds;
}
