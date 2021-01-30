import React, { Fragment } from "react"
import Cropper from "react-easy-crop"
import getCroppedImg from "utils/cropImage"
import { Button } from "@chakra-ui/core"

class App extends React.Component {
  state = {
    imageSrc: this.props.src,
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: this.props.aspect,
    croppedAreaPixels: null,
    croppedImage: null,
    isCropping: false,
  }

  onCropChange = (crop) => {
    this.setState({ crop })
  }

  onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels)
    this.setState({
      croppedAreaPixels,
    })
  }

  onZoomChange = (zoom) => {
    this.setState({ zoom })
  }

  showResult = async () => {
    try {
      this.setState({
        isCropping: true,
      })
      const croppedImage = await getCroppedImg(
        this.state.imageSrc,
        this.state.croppedAreaPixels
      )
      this.setState({
        croppedImage,
        isCropping: false,
      })
      this.props.onCrop(croppedImage)
    } catch (e) {
      console.error(e)
      this.setState({
        isCropping: false,
      })
    }
  }

  onClose = async () => {
    this.setState({
      croppedImage: null,
    })
  }

  onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      let imageDataUrl = await readFile(file)

      this.setState({
        imageSrc: imageDataUrl,
        crop: { x: 0, y: 0 },
        zoom: 1,
      })
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.imageSrc && (
          <Fragment>
            <div className="crop-container">
              <Cropper
                image={this.state.imageSrc}
                crop={this.state.crop}
                zoom={this.state.zoom}
                aspect={this.state.aspect}
                onCropChange={this.onCropChange}
                onCropComplete={this.onCropComplete}
                onZoomChange={this.onZoomChange}
              />
            </div>
            <div className="absolute bottom-0 right-0">
              <Button
                onClick={this.showResult}
                disabled={this.state.isCropping}
              >
                Apply
              </Button>
            </div>
          </Fragment>
        )}
      </div>
    )
  }
}

export function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener("load", () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}

export default App
