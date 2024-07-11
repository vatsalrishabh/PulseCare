import React, { useState, CSSProperties, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SquareLoader } from 'react-spinners';
import './Loader.css'


const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

const Loader = () => {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#8f1b1b");
  const navigate = useNavigate();

  useEffect(()=>{
    setTimeout(()=>{
        navigate("/home")
    },2000);
  },[])


  return (
    <div className="flex justify-center align-middle h-screen custom-center  ">
      <SquareLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={60}
        speedMultiplier={1}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
