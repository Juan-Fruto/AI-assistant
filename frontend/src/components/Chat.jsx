import React from 'react';
import {useMultiChatLogic, MultiChatSocket, MultiChatWindow} from 'react-chat-engine-advanced';
import CustomHeader from "./CustomHeader";
import StandardMessageForm from './messageForms/StandardMessageForm';
import Ai from './messageForms/Ai';

function Chat() {

  //chat engine config
  const chatProps = useMultiChatLogic(import.meta.env.VITE_PROJECT_ID, "test", "123")

  return (
    //the div style takes all window
    <div style={{flexBasis: "100%"}}>

      {/* conection */}
      <MultiChatSocket {...chatProps}/>

      {/* component */}
      <MultiChatWindow
        {...chatProps}
        style={{height: "100vh"}}
        renderChatHeader={(chat) => <CustomHeader chat={chat}/>}
        renderMessageForm={(props) =>{
          if(chatProps.chat?.title.startsWith("AiChat_")){
            return <Ai props={props} activateChat={chatProps.chat}/>
          }  

          return <StandardMessageForm props={props} activateChat={chatProps.chat}/>

        }}
      />

    </div>
  )
}

export default Chat