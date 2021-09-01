const ImageInput = ({ onInput, ...props }) => {
  return (
    <label className="image-input">
      Upload Image
      <input
        type="file"
        onInput={(e) =>
          onInput?.({
            file: e.target.files[0],
            url: URL.createObjectURL(e.target.files[0]),
          })
        }
        {...props}
      ></input>
    </label>
  );
};

export default ImageInput;
