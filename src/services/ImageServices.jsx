export default async function ImageService() {
  const response = await fetch("http://localhost:3000/img", {
    method: "GET",
  });

  const data = await response.json();
  return data;
}
