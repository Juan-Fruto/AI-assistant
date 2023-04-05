import React from 'react'

function CustomHeader({chat}) {
  return (
    <div className='chat-header'>
        <div className='flexbetween'>
            <h3 className='header-text'>
            {chat.title == "Create a chat!" ? "AI Assitant": chat.title}
            </h3>
        </div>
    </div>
  )
}

export default CustomHeader