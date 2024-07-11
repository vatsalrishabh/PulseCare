import React, { useState } from 'react';
import ChatBot from './ChatBot'; // Assuming ChatBot is in the same directory
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';


const ChatBotButton = () => {
  const [showChatBot, setShowChatBot] = useState(false);

  const toggleChatBot = () => {
    setShowChatBot(!showChatBot);
  };

  return (
    <div className="z-10 fixed bottom-4 right-4">
        
      {showChatBot ? (
        <>
             <div className='px-4 py-1 bg-red-800  rounded-lg'>
             <div className='p-1 bg-red-800 flex justify-end'><CloseIcon sx={{ fontSize: 40, color:'white' }} onClick={toggleChatBot} /></div>
             <ChatBot />
             </div>
        </>
      ) : (

        <>
       <div className="rounded-lg overflow-hidden border border-gray-300 shadow-lg">
      <button
        type="button"
        onClick={toggleChatBot}
        className="flex items-center justify-center w-12 h-12 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 rounded-full text-white text-sm transition duration-300 ease-in-out"
      >
        <SmartToyIcon className="w-6 h-6" />
      </button>
    </div>
        </>
       
      )}
    </div>
  );
};

export default ChatBotButton;
