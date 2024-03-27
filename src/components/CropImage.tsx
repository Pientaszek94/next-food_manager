import React, { useState, useRef, ChangeEvent } from "react";
import ReactCrop, {
  PercentCrop,
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import setCanvasPreview from "@/setCanvasPreview";
import Spinner from "./Spinner";
import { useUpdateUserMutation } from "@/redux/services/authService";
import stylesCropImage from "../styles/crop_image.module.scss";
import inputStyles from "../styles/profile_inputs.module.scss";
import "react-image-crop/dist/ReactCrop.css";
import Image from "next/image";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 50;

function CropImage({
  handleChange,
  setError,
  error,
  dialogRef,
}: {
  handleChange: any;
  setError: any;
  error: any;
  dialogRef: any;
}) {
  const imgRef = useRef<any>(null);
  const inputRef = useRef<any>();
  const previewCanvasRef = useRef<any>(null);
  const [file, setFile] = useState("");
  const [crop, setCrop] = useState<any>();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const closeModal = () => {
    dialogRef.current.close();
    setFile("");
  };

  const resetInput = () => {
    inputRef.current.value = null;
  };

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(URL.createObjectURL(e.currentTarget.files![0]));
  };

  const onImageLoad = (e: any) => {
    const { width, height } = e.currentTarget;
    if (width < 150 || height < 150) {
      setFile("");
      setError("Image must be at least 150x150 pixels");
      return;
    } else setError("");
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height,
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const croppAndUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCanvasPreview(
      imgRef.current, // HTMLImageElement
      previewCanvasRef.current, // HTMLCanvasElement
      convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height),
    );
    const dataUrl = previewCanvasRef.current.toDataURL();

    handleChange({ image: dataUrl })
      .then(() => {
        setFile("");
        closeModal();
      })
      .catch((error: any) => {
        console.log("NBRRRO");
        setError("Something went wrong!  Please try again another time.");
        setFile("");
      });

    resetInput();
  };

  return (
    <div className={stylesCropImage.cropimage_console}>
      <input
        ref={inputRef}
        className={inputStyles.input_file}
        id="input-file"
        type="file"
        accept="image/*"
        onChange={handleSelectImage}
      />
      {file ? (
        <div className="cropimage__reactcrop">
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop: PercentCrop) =>
              setCrop(percentCrop)
            }
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            {/* <img
              ref={imgRef}
              src={file}
              alt="Upload"
              onLoad={onImageLoad}
              className={stylesCropImage.reactcrop__to_cropp_image}
            /> */}
            <Image
              ref={imgRef}
              src={file}
              alt="Upload"
              onLoad={onImageLoad}
              width={1600 / 2}
              height={900 / 2}
            />
          </ReactCrop>
          <button className="orange long" onClick={croppAndUpdate}>
            {isLoading ? <Spinner /> : "Set as a profile image"}
          </button>
        </div>
      ) : !error ? (
        <div>
          <h4 className={stylesCropImage.cropimage_info}>
            Please select your image
          </h4>
        </div>
      ) : (
        <div>{error}</div>
      )}

      {crop && (
        <canvas
          ref={previewCanvasRef}
          className={stylesCropImage.cropimage__canvas}
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 50,
            height: 50,
          }}
        />
      )}
    </div>
  );
}

export default CropImage;
