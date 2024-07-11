import React, { useState } from 'react'
import { Carousel } from "flowbite-react";
import image1 from '../assets/home/image1.jpg'
import image2 from '../assets/home/image2.jpeg'
import image3 from '../assets/home/image3.jpg'
import image4 from '../assets/home/image4.jpg'
import image5 from '../assets/home/image5.jpg'
import './Chatbot.css'



const Home = () => {
  const [displayBot,handleBotDisplay] = useState(false);




  return (
    <div className='Home h-screen bg-white'>
        {/* Caraousal Starts Caraousal Ends */}
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        <img src={image1} alt="..." />
        <img src={image2} alt="..." />
        <img src={image3}   alt="..." />
        <img src={image4}  alt="..." />
        <img src={image5}  alt="..." />
      </Carousel>
    </div>


          {/* Caraousal Ends */}



          {/* Chatbot starts */}

      
          {/* Chatbot ends */}




    </div>
  )
}

export default Home
