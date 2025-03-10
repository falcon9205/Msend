"use client";
import React, { useEffect, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import LoginPopup from "@/component/Login-Popup/login-popup.js";
import useStore from "@/Store/UserStore";
import { signIn, signOut, useSession } from "next-auth/react";
import { HiOutlineLogout } from "react-icons/hi";
import { BiSolidRightArrow } from "react-icons/bi";

const Header = () => {
  
  const [menuButton, setMenuButton] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [AccountDropDown, setAccountDropDown] = useState(false);
  const [AccountDropDownMobile, setAccountDropDownMobile] = useState(false);
  const [data, setData] = useState(true);
  const { LoginUser, removeUser,SetEmail } = useStore();
  const { data: session } = useSession();

    
  useEffect(() => {
    if (session?.user?.email && LoginUser !== 0) {
      SetEmail(session.user.email);
      console.log("User Email Updated in Zustand:", session.user.email);
    }
    else{
      SetEmail(null)
    }
  }, [session, SetEmail,LoginUser]);
  
  

  const Logout = () => {
    signOut();
    removeUser();
    if(menuButton)
    setMenuButton(false);
  };
 
   
  
  useEffect(() => {

    if (!data) {
      
      setToggle(false);
    }
    
  }, [data]);
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);
  return (
    <>
      <section
        data-aos="zoom-in"
        className="shadow-2xl border backdrop-blur-lg bg-gradient-to-r from-white to-white/70 fixed top-0 z-40 right-0 left-0 border-gray-400 md:border-gray-200 rounded-md md:rounded-full mx-1 md:mx-10 mt-1"
      >
        {/* desktop navbar */}
        {/* Desktop Header - Hidden on Small Screens */}
        <div className="hidden md:flex justify-between items-center px-[5%] text-xl">
          <Link href="/"><Image
            className="rounded-md"
            width={60}
            height={60}
            src="/email.gif"
            alt="logo"
          /></Link>
          <div className="flex gap-x-5">
            <Link href="#template">
              <h1 className="hover:bg-indigo-600 hover:text-white  px-2 py-2 rounded-lg transition-all duration-300 ease-in-out cursor-pointer">
                Templates
              </h1>
            </Link>
            <Link href="#pricing">
              <h1 className="hover:bg-indigo-600 hover:text-white  px-2 py-2 rounded-lg transition-all duration-300 ease-in-out cursor-pointer">
                Pricing
              </h1>
            </Link>
            <Link href="#contact">
              <h1 className="hover:bg-indigo-600 hover:text-white  px-2 py-2 rounded-lg transition-all duration-300 ease-in-out cursor-pointer">
                Contact Us
              </h1>
            </Link>
            {LoginUser !== 0 && (
              <Link href="/try-it">
              <h1 className=" bg-indigo-500 text-white   px-2 py-2 rounded-lg transition-all duration-300 ease-in-out cursor-pointer flex items-center gap-x-1 hover:gap-x-5 hover:bg-indigo-600">
                Try it <BiSolidRightArrow className="text-sm"/>
              </h1>
            </Link>
            )}
          </div>

          {LoginUser === 0 ? (
            <button
              onClick={() => setToggle(true)}
              className={`bg-red-500 text-white hover:bg-red-600 px-4 rounded-lg py-1 font-bold transition-all duration-300 ease-in-out`}
            >
              Login
            </button>
          ) : (
            <button
              onMouseOver={() => setAccountDropDown(true)}
              onMouseLeave={() => setAccountDropDown(false)}
              className={`p-1  cursor-pointer rounded-full bg-gray-300 hover:bg-gray-100 border border-gray-50 hover:border-gray-400 font-bold transition-all duration-300 ease-in-out`}
            >
              <img
                className="h-10 w-10 rounded-full"
                src="https://cdn.pixabay.com/animation/2022/12/01/17/03/17-03-11-60_512.gif"
              />
            </button>
          )}

          {AccountDropDown && (
            <div
              onMouseOver={() => setAccountDropDown(true)}
              onMouseLeave={() => setAccountDropDown(false)}
              className="text-black w-28 bg-gray-100 rounded-sm border border-gray-400 fixed top-14 right-10"
            >
              <Link href="/profile"><button className="text-xl w-full text-center border-b border-gray-400 hover:bg-green-500 rounded-t-sm hover:text-white transition-all cursor-pointer duration-500 ease-in-out py-2">
                Profile
              </button></Link>
              <button onClick={Logout} className="text-xl w-full text-center hover:bg-red-500 hover:text-white hover:gap-x-2 cursor-pointer rounded-b-sm transition-all duration-500 ease-in-out flex items-center  justify-center py-2">
                Logout <HiOutlineLogout/>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Header - Hidden on Medium Screens */}
        <div className="flex md:hidden px-5 justify-between items-center transition-all duration-1000 ease-in-out">
          <Link href="/">
            <img  className="h-16 " src="/email.gif" alt="logo" />
          </Link>
          <div className="transition-all duration-300 ease-in-out">
            {menuButton ? (
              <HiOutlineMenuAlt3
                onClick={() => setMenuButton(!menuButton)}
                className="text-2xl transition-all duration-300 ease-in-out"
              />
            ) : (
              <IoClose
                onClick={() => setMenuButton(!menuButton)}
                className="text-2xl transition-all duration-300 ease-in-out"
              />
            )}
          </div>
        </div>

        {!menuButton && (
          <div className="fixed inset-0 backdrop-blur-lg bg-white h-[90vh] mt-14  z-50 flex flex-col items-center  space-y-6 text-xl text-black transition-all border-x border-b justify-center rounded-b-md border-gray-400 duration-1000 ease-in-out mb-1">
            <Link href="#template" onClick={() => setMenuButton(!menuButton)}>
              <h1 className=" hover:bg-indigo-500 px-4 rounded-sm hover:text-white">
                Templates
              </h1>
            </Link>

            <Link href="#pricing" onClick={() => setMenuButton(!menuButton)}>
              <h1 className=" hover:bg-indigo-500 px-4 rounded-sm hover:text-white">
                Pricing
              </h1>
            </Link>

            <Link href="#contact" onClick={() => setMenuButton(!menuButton)}>
              <h1 className=" hover:bg-indigo-500 px-4 rounded-sm hover:text-white">
                Contact Us
              </h1>
            </Link>

            {LoginUser !== 0 && (
              <Link href="/try-it" onClick={() => setMenuButton(!menuButton)}>
              <h1 className="flex items-center bg-indigo-500 gap-x-2 px-4 rounded-sm text-white">
                Try it <BiSolidRightArrow className="text-sm"/>
              </h1>
            </Link>
            )}
            {LoginUser === 0 ? (
              <button
                onClick={() => {
                  setMenuButton(!menuButton);
                  setToggle(true);
                }}
                className="bg-red-500 px-6 py-2 rounded-lg text-white hover:bg-red-600 transition-all"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => setAccountDropDownMobile(!AccountDropDownMobile)}
                className={`p-1  cursor-pointer rounded-full bg-gray-300 hover:bg-gray-100 border border-gray-50 hover:border-gray-400 font-bold transition-all duration-300 ease-in-out`}
              >
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://cdn.pixabay.com/animation/2022/12/01/17/03/17-03-11-60_512.gif"
                />
              </button>
            )}

            {AccountDropDownMobile && (
              <div className="">
                <Link href="/profile"><h1
                  onClick={() => {
                    setMenuButton(!menuButton);
                    setToggle(true);
                  }}
                  className="  bg-green-500 text-white text-center rounded-sm px-4"
                >
                  Profile
                </h1></Link>

                <h1
                  onClick={Logout}
                  className=" bg-red-500 cursor-pointer px-4 mt-5 rounded-sm text-white"
                >
                  Logout
                </h1>
              </div>
            )}
          </div>
        )}
      </section>

      {toggle && <LoginPopup isOpen={toggle} close={() => setToggle(false)} />}
    </>
  );
};

export default Header;
