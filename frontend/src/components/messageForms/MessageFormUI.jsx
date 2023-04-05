import React, {useState} from 'react';
import Dropzone from "react-dropzone";
import {PaperAirplaneIcon, PaperClipIcon, XMarkIcon} from "@heroicons/react/24/solid";

function MessageFormUI({
    message,
    setAttachment,
    handleChange,
    handleSubmit,
    handleKeyDown
}) {

  const [preview, setPreview] = useState('');
  
  return (
    <div className='message-form-container'>
        {/* image preview */}
        {preview && (
        <div className="message-form-preview">
            <img
                alt="message-form-preview"
                className="message-form-preview-image"
                src={preview}
                onLoad={() => URL.revokeObjectURL(preview)}
            />
            <XMarkIcon
                className="message-form-icon-x"
                onClick={() => {
                    setPreview("");
                    setAttachment("");
                }}
            />
        </div>
        )}
        {/* end */}

        <div className='message-form'>
            <div className='message-form-input-container'>
                <input 
                    className='message-form-input'
                    type="text"
                    value={message}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Haz una pregunta"   
                />
            </div>
        </div>
        <div className='message-forms-icons'>
            {/* file selector */}
            {/* <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                noClick={true}
                onDrop={(acceptedFiles) => {
                    setAttachment(acceptedFiles[0]);
                    setPreview(URL.createObjectURL(acceptedFiles[0]));
                }}
            >
                {({ getRootProps, getInputProps, open }) => (
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <PaperClipIcon className="message-form-icon-clip" onClick={open}/>
                    </div>
                )}
            </Dropzone> */}
            {/* end */}

            {/* <hr className='vertical-line'/> */}
            <PaperAirplaneIcon
                className='message-form-icon-airplane'
                onClick={(preview) => {
                    //remove the image from the input once the user clicked on
                    setPreview('');
                    handleSubmit();
                }}
            />
        </div>
    </div>
  )
}

export default MessageFormUI