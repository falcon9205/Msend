"use client"
import React, { useEffect } from "react";
import { IoIosMail } from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
const footer = () => {
  
  useEffect(() => {
        AOS.init({
          duration: 500,
          once: true,
          easing: "ease-in-out",
        });
      }, []);
  return (
    <>
      <section data-aos="zoom-in" className="bg-gradient-to-r from-[#001429]  to-[#011327] h-full mb-1 rounded-t-4xl   rounded-b-md mx-1 px-5 ">
        <div className="py-10 md:flex justify-between space-y-10 md:space-y-0">
          <h1 className="text-white text-center md:text-left text-3xl font-bold">
            <a className="bg-indigo-500 px-2 rounded-md py-1">MSend</a> &ndash;
            Simplifying Email&sbquo; Amplifying Impact.{" "}
          </h1>

          <div className="text-white text-center md:text-left text-2xl md:text-3xl space-y-2">
            <h1>Connect with me</h1>
            <div className="flex gap-x-2 justify-center">
              <IoIosMail className="border border-gray-600 text-yellow-400 hover:bg-gray-200 hover:text-black text-4xl rounded-full p-1 transition-all duration-700 ease-in-out" />
              <FaInstagram className="border border-gray-600 text-yellow-400 hover:bg-gray-200 hover:text-black text-4xl rounded-full p-1 transition-all duration-700 ease-in-out" />
              <FaLinkedinIn className="border border-gray-600 text-yellow-400 hover:bg-gray-200 hover:text-black text-4xl rounded-full p-1 transition-all duration-700 ease-in-out" />
              <FaWhatsapp className="border border-gray-600 text-yellow-400 hover:bg-gray-200 hover:text-black text-4xl rounded-full p-1 transition-all duration-700 ease-in-out" />
            </div>
          </div>

          <div className="text-white text-center md:text-left  text-2xl md:text-3xl space-y-2">
            <h1>Github Repo</h1>
            <div className="flex gap-x-2 justify-center">
              <FaGithub className="border border-gray-600 text-yellow-400 hover:bg-gray-200 hover:text-black text-4xl rounded-full p-1 transition-all duration-700 ease-in-out" />
            </div>
          </div>
        </div>
        <h1 className="text-center text-gray-400 text-xs">
        {" "}
        © 2025 Msend &mdash; All Right Reserved
      </h1>
      </section>
      
    </>
  );
};

export default footer;
