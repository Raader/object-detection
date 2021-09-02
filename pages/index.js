import { useEffect, useRef, useState } from "react";
import ImageCanvas from "../components/image_canvas";
import ImageInput from "../components/image_input";

export default function Home() {
  const [loading, setLoading] = useState(false);
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
    <>
      <div style={{ height: "100vh" }}>
        <h1>Object Detection</h1>
        <div className="header">
          <ImageInput
            onInput={(image) => {
              if (loading) return;
              setImage(image);
              setPredictions([]);
              setLoading(true);
              detectObjects(image).then((data) => {
                setPredictions(data.predictions);
                setLoading(false);
              });
            }}
          ></ImageInput>
        </div>
        <div className="image-cont">
          <ImageCanvas
            className="detection-canvas"
            style={{ filter: loading ? "blur(8px)" : "" }}
            image={image?.url}
            predictions={predictions}
          ></ImageCanvas>
          {loading ? (
            <div className="load-cont">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="loading-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      <footer>
        Made By <a href="https://www.raader.me">Raader</a>
      </footer>
    </>
  );
}
