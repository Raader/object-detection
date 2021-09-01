import React, { useEffect, useRef } from "react";

const ImageCanvas = ({ image, predictions = [], ...props }) => {
  const canvas = useRef();
  const paddingFactor = 15;

  const drawLabeledRectangle = (ctx, { x, y, width, height, text }) => {
    ctx.strokeStyle = "black";
    ctx.lineWidth = ctx.canvas.width / 80;
    ctx.strokeRect(x, y, width, height);

    ctx.strokeStyle = "white";
    ctx.lineWidth = ctx.canvas.width / 200;
    ctx.strokeRect(x, y, width, height);

    ctx.font = `${ctx.canvas.width / 20}px arial`;

    ctx.strokeStyle = "black";
    ctx.lineWidth = ctx.canvas.width / 100;
    ctx.strokeText(text, x, y - ctx.canvas.width / 40);

    ctx.fillStyle = "white";
    ctx.fillText(text, x, y - ctx.canvas.width / 40);
  };

  useEffect(() => {
    if (!image) return;

    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.current.getContext("2d");

    //create an image element to use for rendering
    const imageElement = new Image();
    imageElement.src = image;

    const onLoad = () => {
      const padding = imageElement.width / paddingFactor;
      ctx.canvas.width = imageElement.width + padding * 2;
      ctx.canvas.height = imageElement.height + padding * 2;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.translate(padding, padding);

      ctx.drawImage(imageElement, 0, 0);

      predictions?.forEach((prediction) => {
        drawLabeledRectangle(ctx, {
          x: prediction.bbox.x1,
          y: prediction.bbox.y1,
          width: prediction.bbox.x2 - prediction.bbox.x1,
          height: prediction.bbox.y2 - prediction.bbox.y1,
          text: prediction.label,
        });
      });
    };

    //draw the image when it's finished loading
    imageElement.addEventListener("load", onLoad, false);

    return () => imageElement.removeEventListener("load", onLoad, false);
  }, [image, canvas, predictions]);

  return <canvas ref={canvas} {...props}></canvas>;
};

export default ImageCanvas;
