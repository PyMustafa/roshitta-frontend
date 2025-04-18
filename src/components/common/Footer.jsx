import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 pb-4 pt-8 px-6">
      {/* Main container with responsive layout for footer content */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-start items-start text-center md:text-left gap-8">
        
        {/* First column - Logo and description */}
        <div className="md:w-1/3 md:mr-auto md:ml-4 space-y-4 order-1">
          <h2 className="text-2xl font-bold text-[#4a5ae8]">Roshitta</h2>
          <p className="text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
          </p>
        </div>

        {/* Second column - Company navigation links */}
        <div className="md:w-1/6 md:mr-4 md:ml-auto space-y-4 order-3">
          <h3 className="text-lg font-bold ">COMPANY</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-[#09e5ab] transition">Home</a></li>
            <li><a href="#" className="hover:text-[#09e5ab] transition">About us</a></li>
            <li><a href="#" className="hover:text-[#09e5ab] transition">Delivery</a></li>
            <li><a href="#" className="hover:text-[#09e5ab] transition">Privacy policy</a></li>
          </ul>
        </div>

        {/* Third column - Contact information */}
        <div className="md:w-1/6 md:ml-auto space-y-4 order-4">
          <h3 className="text-lg font-bold ">GET IN TOUCH</h3>
          <ul className="space-y-2">
            <li className="flex justify-center md:justify-start items-center">
              <span className="mr-2">📞</span>
              <a href="tel:+20-000-0000000" className="hover:text-[#09e5ab] transition">+20-000-0000000</a>
            </li>
            <li className="flex justify-center md:justify-start items-center">
              <span className="mr-2">✉️</span>
              <a href="mailto:roshitta@gmail.com" className="hover:text-[#09e5ab] transition">roshitta@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright line */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-200 text-center text-sm text-black font-semibold">
        <p>Copyright 2025 © Roshitta - All Right Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
