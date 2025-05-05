import React from 'react';
import Image from 'next/image';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white py-8 rtl">
      <div className="max-w-[1200px] mx-auto px-4 flex justify-between items-center flex-wrap gap-8 md:flex-row flex-col">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl m-0">  مصنع ڤيو لملابس الشباب </h2>
        </div>

        <div className="flex flex-col gap-4 items-center md:items-start">
          <div className="flex items-center gap-2">
            <FaPhone className="text-2xl text-green-500" />
            <a href="tel:+201224900205" className="text-white hover:text-green-500 transition-colors duration-300">
              0122 4900 205
            </a>
          </div>
          
          <div className="flex items-center gap-2">
            <FaWhatsapp className="text-2xl text-green-500" />
            <a 
              href="https://wa.me/201224900205" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-green-500 transition-colors duration-300"
            >
              تواصل معنا عبر واتساب
            </a>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-8 pt-4 border-t border-[#333]">
        <p>جميع الحقوق محفوظة © {new Date().getFullYear()} مصنع ڤيو </p>
      </div>
    </footer>
  );
};

export default Footer;
