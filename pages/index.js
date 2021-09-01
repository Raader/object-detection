import { useEffect, useRef, useState } from "react";
import ImageCanvas from "../components/image_canvas";
import ImageInput from "../components/image_input";

export default function Home() {
  const [image, setImage] = useState({ file: undefined, url: "" });
  const [predictions, setPredictions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("model", "yolov4");
    formData.append("image", image.file);
    fetch("/api/detection", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => setPredictions(data.predictions));
  };

  return (
    <div className="layout">
      <div className="header">
        <ImageInput onInput={(image) => setImage(image)}></ImageInput>
        <h1>Image Detection</h1>
        <button onClick={handleSubmit}>Detect Objects</button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ImageCanvas
          className="detection-canvas"
          image={image?.url}
          predictions={predictions}
        ></ImageCanvas>
      </div>
    </div>
  );
}
