import React, { useEffect } from 'react';
import CanvasAnimation from '../../components/CanvasAnimation/CanvasAnimation';

const AboutPage = () => {
  return (
    <div className="flex justify-center items-center relative">
    <CanvasAnimation />
    <div className="aizen absolute top-3/4 left-1/6 w-1/2 h-1/2 bg-cover bg-center"></div>
  </div>

  );
};

export default AboutPage;

