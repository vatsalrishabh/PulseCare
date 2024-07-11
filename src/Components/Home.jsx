import React from 'react'
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import config from '../bot/config'
import MessageParser from '../bot/MessageParser.jsx';
import ActionProvider from '../bot/ActionProvider.jsx';
import { Carousel } from "flowbite-react";
import image1 from '../assets/home/image1.jpg'

import './Chatbot.css'

const Home = () => {
  return (
    <div className='Home h-screen bg-white'>
        {/* Caraousal Starts Caraousal Ends */}
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        <img src={image1} alt="..." />
        <img src={image1} alt="..." />
        <img src={image1}   alt="..." />
        <img src={image1}  alt="..." />
        <img src={image1}  alt="..." />
      </Carousel>
    </div>
          {/* Caraousal Ends */}



          {/* Chatbot starts */}
<div className='p-5'>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
</div>
          {/* Chatbot ends */}




    </div>
  )
}

export default Home
