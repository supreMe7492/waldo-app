import { API_URL } from "./ApiConfig";

export default async function GetImgChar(imgId) {
  const response = await fetch(`${API_URL}/characters/${imgId}`, {
    method: "GET",
  });

  const chData = await response.json();
  const chIds = chData.data.map((d) => ({
    chId: parseInt(d.id),
    chName: d.name,
  }));

  return chIds;
}
