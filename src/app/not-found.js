import Image from 'next/image'
import React from 'react'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from 'next/link';

const Page = () => {
  return (
    <>
     <section data-aos="zoom-out"  className="flex flex-col space-y-2 pt-36 md:py-24 items-center gap-x-7 px-[5%]">
             <div className="space-y-5 text-center md:text-left">
               <h1 className="text-3xl md:text-5xl font-bold text-gray-700 leading-[110%]">
                 <a className="bg-indigo-500 text-white px-4 rounded-md leading-12">404 Error</a>{" "}
                 &ndash; Oops! Looks like you&apos;re lost
               </h1>
               
               
             </div>
             <Image
               className=''
               src="https://cdn.svgator.com/images/2024/04/detective-animation-404-error-page.gif"
               alt="Email Sending Animation"
               width={500} // Adjust width accordingly
               height={500} // Adjust height accordingly
             />

<h1 className='text-xl mb-10 md:mb-0'>Try to Visit <Link className='text-indigo-500 underline' href="/">HomePage</Link></h1>
           </section>

           
    </>
  )
}

export default Page
