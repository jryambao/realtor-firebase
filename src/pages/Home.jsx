import { useState } from 'react';
import React from 'react'

function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      
    </>
  );
}

export default Home