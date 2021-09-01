import { useEffect, useRef, useState } from "react";
import ImageCanvas from "../components/image_canvas";
import ImageInput from "../components/image_input";

export default function Home() {
  const [image, setImage] = useState({ file: undefined, url: "" });
  const [predictions, setPredictions] = useState([]);

  const detectObjects = (image) => {
    const formData = new FormData();
    formData.append("model", "yolov4");
    formData.append("image", image.file);
    return fetch("/api/detection", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
  };

  return (
    <div className="layout">
      <h1 style={{ margin: "0 2rem" }}>Image Detection</h1>
      <div className="header">
        <ImageInput
          onInput={(image) => {
            setImage(image);
            setPredictions([]);
            detectObjects(image).then((data) =>
              setPredictions(data.predictions)
            );
          }}
        ></ImageInput>
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
