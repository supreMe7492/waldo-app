export default async function ImageService(id) {
  if (!id) {
    const response = await fetch("http://localhost:3000/img", {
      method: "GET",
    });

    const data = await response.json();
    return data;
  } else {
    const response = await fetch(`http://localhost:3000/img/${id}`, {
      method: "GET",
    });

    const data = await response.json();
    return data;
  }
}
