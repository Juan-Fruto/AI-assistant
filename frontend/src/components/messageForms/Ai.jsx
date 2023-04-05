import React, {useState} from 'react';
import MessageFormUI from './messageFormUI';
import {usePostAiTextMutation} from '../../state/api.js';

function Ai({props, activateChat}) {

    const [message, setMessage] = useState('');
    const [attachment, setAttachment] = useState('');
    console.log(usePostAiTextMutation);
    const [trigger] = usePostAiTextMutation();
    console.log(trigger);

    const handleChange = (e) => setMessage(e.target.value);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          buttonRef.current.click();
        }
    };

    const handleSubmit = async () => {
        const date = new Date()
        .toISOString()
        .replace("T", " ")
        .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
        //files
        const att = attachment ? [{ blob: attachment, file: attachment.name }] : [];
        
        const form = {
            attachments: att,
            created: date,
            sender_username: props.username,
            text: message,
            activeChatId: activateChat.id
        };

        //sedning
        props.onSubmit(form);
        //trigger the api call, form is the payload
        trigger(form);
        //cleaning text input 
        setMessage('');
        setAttachment('');
    }
    
    return (
        <MessageFormUI
            message={message}
            setAttachment={setAttachment}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleKeyDown={handleKeyDown}
        />
    )
}

export default Ai