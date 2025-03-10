"use client"
import React, { useEffect } from "react";
import { IoIosMail } from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
const Footer = () => {
  
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
             <Link target="_blank" href="mailto:mauryahimanshu567@gmail.com?subject=Msend&body=Hey Himanshu,"> <IoIosMail className="border border-gray-600 text-yellow-400 hover:bg-gray-200 hover:text-black text-4xl rounded-full p-1 transition-all duration-700 ease-in-out" /></Link>
             <Link target="_blank" href="https://www.instagram.com/yeahthatshemu/"> <FaInstagram className="border border-gray-600 text-yellow-400 hover:bg-gray-200 hover:text-black text-4xl rounded-full p-1 transition-all duration-700 ease-in-out" /></Link>
             <Link target="_blank" href="https://www.linkedin.com/in/himanshu-maurya-7b5273190/"> <FaLinkedinIn className="border border-gray-600 text-yellow-400 hover:bg-gray-200 hover:text-black text-4xl rounded-full p-1 transition-all duration-700 ease-in-out" /></Link>
             <Link target="_blank" href="https://api.whatsapp.com/send?phone=919205487164&text=Hi%20Himanshu%20%F0%9F%91%8B"> <FaWhatsapp className="border border-gray-600 text-yellow-400 hover:bg-gray-200 hover:text-black text-4xl rounded-full p-1 transition-all duration-700 ease-in-out" /></Link>
            </div>
          </div>

          <div className="text-white text-center md:text-left  text-2xl md:text-3xl space-y-2">
            <h1>Github Repo</h1>
            <div className="flex gap-x-2 justify-center">
              <Link target="_blank" href="https://github.com/falcon9205"><FaGithub className="border border-gray-600 text-yellow-400 hover:bg-gray-200 hover:text-black text-4xl rounded-full p-1 transition-all duration-700 ease-in-out" /></Link>
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

export default Footer;
