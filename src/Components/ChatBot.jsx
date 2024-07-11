import React from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from '../bot/config';
import MessageParser from '../bot/MessageParser.jsx';
import ActionProvider from '../bot/ActionProvider.jsx';


const ChatBot = () => {
  return (
    <div className='Chatbot z-10'>
     
     
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
        
    </div>
  );
};

export default ChatBot;
