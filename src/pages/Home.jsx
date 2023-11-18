import { useState } from 'react';
function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={toggleAccordion} className="text-blue-500 hover:underline">
        Toggle Accordion
      </button>
      <div className={`overflow-hidden transition-height w-50 duration-500 ${isOpen ? 'bg-blue-500' : 'bg-red-500'}`}>
        Accordion content goes here
      </div>
    </>
  );
}

export default Home