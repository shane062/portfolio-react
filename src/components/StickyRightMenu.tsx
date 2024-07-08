// components/StickyMenuBar.js
"use client"
import { useState } from 'react';

const StickyMenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed top-0 right-0 h-full ${isOpen ? 'w-64' : 'w-0'} transition-width duration-300 bg-gray-800`}>
      <div className="relative h-full">
        <button 
          onClick={toggleMenu}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-2/4 bg-gray-800 text-white p-2 rounded-full focus:outline-none"
        >
          {isOpen ? '<' : '>'}
        </button>
        
        <div className={`absolute top-0 left-full h-0 w-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-l-[20px] ${isOpen ? 'border-l-gray-800' : 'border-l-transparent'} transition-border-color duration-300`}></div>
        {isOpen && (
          <div className="p-4 text-white">
            {/* Your menu content here */}
            <h2 className="text-xl mb-4">Menu</h2>
            <ul>
              <li className="mb-2">Item 1</li>
              <li className="mb-2">Item 2</li>
              <li className="mb-2">Item 3</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default StickyMenuBar;
