import React, { useState, useCallback } from "react"
import Cropper from "react-easy-crop"
import Files from "react-butterfiles"
import getCroppedImg from "utils/cropImage"

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener("load", () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}

const Crop = ({ src }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [image, setImage] = useState(null)
  const [mode, setMode] = useState("EDIT")
  const [croppedImage, setCroppedImage] = useState(null)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const handleCropComplete = useCallback((a, b) => {
    setCroppedAreaPixels(b)
  }, [])

  const showResult = useCallback(async () => {
    setCroppedImage(await getCroppedImg(image, croppedAreaPixels))
  }, [])

  return (
    <div>
      {croppedImage && <img src={croppedImage} />}
      {image && (
        <div className="w-max-lg overflow-hidden">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>
      )}
      <Files
        accept={["image/png", "image/jpg", "image/jpeg"]}
        onSuccess={async (file) => {
          setImage(await readFile(file[0].src.file))
        }}
      >
        {({ browseFiles, getDropzoneProps, getLabelProps }) => (
          <div>
            <button
              type="button"
              className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
              onClick={browseFiles}
            >
              Change
            </button>
          </div>
        )}
      </Files>
      <button onClick={showResult}>Done</button>
    </div>
  )
}

export default Crop
