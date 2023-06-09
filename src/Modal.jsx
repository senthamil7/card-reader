import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import { recognize } from 'tesseract.js';

const Modal = ( {closeModal} ) => {
  const webcamRef = useRef(null);
  let cardnumber = ""
  const captureImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    await processImage(imageSrc);
  };

  const processImage = async (imageSrc) => {
    const result = await recognize(imageSrc, 'eng');
    let res = result.data.text.replace(/(\r\n|\n)/gm, "");
    let formattedres = res.replace(/[^0-9 /]/g, "");
    let cardnumberarray = formattedres.split(" ");
    const reg = /^\d+$/;
    console.log('cardnumberarray',cardnumberarray);
    cardnumberarray.forEach((item) => {
        if((item && item !==0 ) && ((item.length === 4 || item.length === 8 ) && reg.test(item))) {
            cardnumber += item
        }
    });
    console.log('cardnumber',cardnumber);
    closeModal(cardnumber);
  };


  return (
    <div className= "modal open">
      <div className="modal-content">
        <h1>Card Reader</h1>
            <div className="overlay">
        <div className="overlay-helper">
            <div className="overlay-element top-left"></div>
            {/* <div className="overlay-element top-right"></div> */}
            {/* <div className="overlay-element bottom-left"></div> */}
            <div className="overlay-element bottom-right"></div>
        </div>
        </div>
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg"
        style={{
                height: "400px",
                width: "700px",
                objectFit: "fill",
            }}
             />
        <div className='button'>
        <button onClick={captureImage}>Capture it!</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;