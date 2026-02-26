import { useEffect, useState } from "react";

const Fotos = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch("https://api.pexels.com/v1/search?query=event&per_page=12", {
      headers: {
        Authorization: import.meta.env.VITE_PEXELS_API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => setPhotos(data.photos))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
      {photos.map((photo) => (
        <img
          key={photo.id}
          src={photo.src.medium}
          alt={photo.photographer}
          style={{ width: "100%", borderRadius: "8px" }}
        />
      ))}
    </div>
  );
};

export default Fotos;