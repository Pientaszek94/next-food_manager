import React, { useState, useRef, ChangeEvent } from "react";
import ReactCrop, {
  Crop,
  PercentCrop,
  PixelCrop,
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import setCanvasPreview from "@/setCanvasPreview";
import Spinner from "./Spinner";
import { cropImageStyles, profileInputsStyles } from "../styles";
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
  const imgRef = useRef<HTMLImageElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [file, setFile] = useState("");
  const [crop, setCrop] = useState<Crop>();
  const [isLoading, setIsLoading] = useState(false);
  const closeModal = () => {
    dialogRef.current.close();
    setFile("");
  };

  const resetInput = () => {
    inputRef.current = null;
  };

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(URL.createObjectURL(e.currentTarget.files![0]));
  };

  const onImageLoad = (e: any) => {
    setIsLoading(false);
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
    setIsLoading(true);
    setCanvasPreview(
      imgRef.current!,
      previewCanvasRef.current!,
      convertToPixelCrop(crop, imgRef.current!.width, imgRef.current!.height),
    );
    const dataUrl = previewCanvasRef.current!.toDataURL();

    handleChange({ image: dataUrl })
      .then(() => {
        setFile("");
        closeModal();
      })
      .catch(() => {
        setError("Something went wrong!  Please try again another time.");
        setFile("");
      });

    resetInput();
  };

  return (
    <div className={cropImageStyles.cropimage_console}>
      <input
        ref={inputRef}
        className={profileInputsStyles.input_file}
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
            <Image
              ref={imgRef}
              src={file}
              alt="Upload"
              onLoad={onImageLoad}
              width={1600 / 2}
              height={900 / 2}
            />
          </ReactCrop>
          {isLoading ? (
            <Spinner />
          ) : (
            <button className="orange long" onClick={croppAndUpdate}>
              Set as a profile image
            </button>
          )}
        </div>
      ) : !error ? (
        <div>
          <h4 className={cropImageStyles.cropimage_info}>
            Please select your image
          </h4>
        </div>
      ) : (
        <div>{error}</div>
      )}

      {crop && (
        <canvas
          ref={previewCanvasRef}
          className={cropImageStyles.cropimage__canvas}
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
