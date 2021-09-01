import React, { useEffect, useRef } from "react";

const ImageCanvas = ({ image, predictions = [], ...props }) => {
  const canvas = useRef();
  const padding = 25;

  useEffect(() => {
    if (!image) return;

    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.current.getContext("2d");

    //create an image element to use for rendering
    const imageElement = new Image();
    imageElement.src = image;

    const onLoad = () => {
      ctx.canvas.width = imageElement.width;
      ctx.canvas.height = imageElement.height;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      ctx.drawImage(imageElement, 0, 0);

      predictions?.forEach((prediction) => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(
          prediction.bbox.x1,
          prediction.bbox.y1,
          prediction.bbox.x2 - prediction.bbox.x1,
          prediction.bbox.y2 - prediction.bbox.y1
        );

        ctx.font = `${ctx.canvas.width / 20}px arial`;

        ctx.strokeStyle = "bw";
        ctx.lineWidth = ctx.canvas.width / 100;
        ctx.strokeText(
          prediction.label,
          prediction.bbox.x1,
          prediction.bbox.y1 - 25
        );

        ctx.fillStyle = "white";
        ctx.fillText(
          prediction.label,
          prediction.bbox.x1,
          prediction.bbox.y1 - 25
        );
      });
    };

    //draw the image when it's finished loading
    imageElement.addEventListener("load", onLoad, false);

    return () => imageElement.removeEventListener("load", onLoad, false);
  }, [image, canvas, predictions]);

  return <canvas ref={canvas} {...props}></canvas>;
};

export default ImageCanvas;
