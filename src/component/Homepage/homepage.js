"use client";
import { Quicksand } from "next/font/google";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import AOS from "aos";
import "aos/dist/aos.css";
import Marquee from "react-fast-marquee";
import Form from "@/component/Form/form.js"
import Link from "next/link";
import { useRouter } from "next/navigation";
import useStore from "@/Store/UserStore";
import { Router } from "next/router";
import toast, { Toaster } from 'react-hot-toast';
import { GoCheckCircleFill } from "react-icons/go";
import { IoCloseCircle } from "react-icons/io5";

const notify = () => toast('Please Login!',
  {
    icon: <GoCheckCircleFill className="text-green-500"/>,
    style: {
      borderRadius: '10px',
      background: '#fff',
      color: '#333',
    },
  }
);

const Premium = () =>toast('In Production',
  {
    icon: <IoCloseCircle className="text-red-500"/>,
    style: {
      borderRadius: '10px',
      background: '#fff',
      color: '#333',
    },
  }
);
const basic = () =>toast('Login and Use',
  {
    icon:  <GoCheckCircleFill className="text-green-500"/>,
    style: {
      borderRadius: '10px',
      background: '#fff',
      color: '#333',
    },
  }
);

const Homepage = () => {
  const [clients, setClients] = useState([]);
  const {LoginUser} = useStore()
  const router = useRouter()
  const templates = [
    {
      image: "/templates/interview-confirmation.png",
      title: "Interview Confirmation",
    },
    {
      image: "/templates/launch.png",
      title: "Product Launch",
    },
    {
      image: "/templates/promotion.png",
      title: "Promotion Announcement",
    },
    {
      image: "/templates/subscribe-newsletter.png",
      title: "Subscribe News-Letter",
    },
    {
      image: "/templates/team-invite.png",
      title: "Team Invitation",
    },
    {
      image: "/templates/welcome-onboard.png",
      title: "Welcome Onboard",
    },
  ];
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://dummyjson.com/users");
        const data = await response.json();
        setClients(data.users); // Extracting users array from response
        console.log(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);


  const navigateTemplate = ()=>{
    if(LoginUser === 1){
         router.push('/try-it')
    }
    else{
      notify()
    }
  }

  const plans = (e)=>{
     if(e==1){
      basic()
     }
     else{
      Premium()
     }

       
  }
  return (
    <>
      {/* hero section */}
      <section data-aos="zoom-out"  className="md:flex pt-36 md:pt-36 items-center gap-x-7 px-[5%]">
        <div className="space-y-5">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-700 leading-[110%]">
            <a className="bg-indigo-500 text-white px-4 rounded-md leading-12">MSend</a>{" "}
            &ndash; Send Emails Effortlessly&sbquo; Anytime&sbquo; Anywhere!
          </h1>
          <p className="text-gray-500 text-lg md:text-lg">
            Simplify your email experience with MSend. Whether it&apos;s
            personal or professional&sbquo; send emails instantly with ease. No
            hassle&sbquo; just smooth and efficient communication.
          </p>
          <Link href="#pricing"><button className="bg-indigo-500 text-lg hover:bg-indigo-700 px-2 py-1 text-white rounded-sm transition-all duration-300 ease-in-out flex items-center gap-x-1 md:hover:gap-x-5 cursor-pointer">
            Explore Pricing{" "}
            <MdKeyboardDoubleArrowRight className="text-2xl md:text-xl" />
          </button></Link>
        </div>
        <Image
          className="rounded-2xl"
          src="https://i.gifer.com/QHTn.gif"
          alt="Email Sending Animation"
          width={500} // Adjust width accordingly
          height={500} // Adjust height accordingly
        />
      </section>

      {/* what we are solving */}
      <section data-aos="fade-up" className="text-center pt-36 gap-x-7 justify-center px-[5%]">
        <h1 className="text-3xl md:text-5xl  font-bold text-gray-700">
          What we are solving
        </h1>
        <p className="md:w-2/3 mt-5 md:mt-20 mx-auto md:text-lg p-4 bg-indigo-50 text-gray-600 rounded-md hover:bg-indigo-500 hover:text-white border border-indigo-200 transition-all duration-700 ease-in-out">
          Most new-age businesses struggle with expensive and complex email
          systems. MSend provides a simple&sbquo; cost &ndash; effective
          solution&sbquo; so you can focus on growing your business &ndash;
          without worrying about high mailing costs. We offer the best
          competitive plans, ensuring you get reliable and efficient email
          services at a price that fits your budget. Feel free to try our basic
          plan as a trial and experience the ease of MSend!{" "}
        </p>
        <div className="flex items-center mt-2 mx-auto justify-center">
          <h1 className="text-xl md:text-lg p-4 font-bold text-gray-600">
            feel free to{" "}
          </h1>
         <Link href="#contact"> <button className="text-lg  bg-indigo-500 hover:bg-indigo-700 px-2 py-1 text-white rounded-sm transition-all duration-300 ease-in-out flex items-center gap-x-1 md:hover:gap-x-5 cursor-pointer">
            Contact Us <IoIosCall className="md:text-xl" />
          </button></Link>
        </div>
      </section>

      {/* Trusted by Businesses, Loved by Clients! */}
      <section data-aos="fade-up" className="pt-36 space-y-5 md:space-y-20 px-[5%]">
        <h1 className="text-3xl md:text-5xl  font-bold text-gray-700">
          Trusted by Businesses&sbquo; Loved by Clients!
        </h1>
        <Marquee pauseOnHover={true} direction="right" speed={20}>
          <div className="flex mx-5 gap-x-10 md:gap-x-20 pt-5 pb-5">
            {clients.map((data, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={data.image}
                  className="w-20 h-20 md:w-28 md:h-28 rounded-full border object-cover"
                  alt={data.firstName}
                />
                <h1 className="text-sm font-semibold mt-2 text-center">
                  {data.firstName} {data.lastName}
                </h1>
              </div>
            ))}
          </div>
        </Marquee>
      </section>

      {/* Pricing */}
      <section id="pricing"  className="pt-36 space-y-5 md:space-y-20 px-[5%]">
        <h1 className="text-3xl md:text-5xl justify-center mx-auto flex font-bold text-gray-700">
          Pricing
        </h1>
        <div  className="grid md:grid-cols-3 gap-y-5 md:gap-x-[5%] grid-cols-1">
          {/* Basic Plan */}
          <div data-aos="fade-right" className="border-y-4 border-2 border-gray-400 p-5 rounded-lg flex flex-col justify-between hover:scale-[105%] h-full transition-all duration-300 ease-in-out">
            <div>
              <h1 className="text-3xl text-center">Basic</h1>
              <ul className="list-disc pl-5 space-y-2 mt-5 md:mt-0">
                <li>Send up to 500 emails per day</li>
                <li>Get access to 10 free email templates</li>
                <li>Send up to 100 emails in a single batch</li>
                <li>Enjoy secure and reliable email delivery</li>
                <li>Manage emails easily with our intuitive dashboard</li>
                <li>No hidden costs—Start for free!</li>
              </ul>
            </div>
            <button onClick={()=>plans(1)} className="bg-indigo-500 cursor-pointer text-xl flex items-center gap-x-1 hover:gap-x-5 py-1 text-white justify-center px-4 rounded-md mt-4 transition-all duration-300 ease-in-out hover:bg-indigo-600">
              Start Free Trial <BsArrowUpRightCircleFill className="md:text-lg" />
            </button>
          </div>

          {/* Premium Plan */}
          <div data-aos="fade-up" className="border-y-4 border-2 border-indigo-500 p-5 rounded-lg flex flex-col justify-between hover:scale-[105%] h-full transition-all duration-300 ease-in-out ">
            <div>
              <h1 className="text-3xl text-center">Premium</h1>
              <ul className="list-disc pl-5 space-y-2  mt-5 md:mt-0">
                <li>Send up to 5,000 emails per day</li>
                <li>Unlock access to all email templates</li>
                <li>Send unlimited emails in one go</li>
                <li>Experience secure and dependable email delivery</li>
                <li>Streamline your workflow with an advanced dashboard</li>
                <li>Transparent pricing—No hidden charges!</li>
              </ul>
            </div>
            <button onClick={()=>plans(2)} className="bg-indigo-500 cursor-pointer text-xl flex items-center gap-x-1 hover:gap-x-5 py-1 text-white justify-center px-4 rounded-md mt-4 transition-all duration-300 ease-in-out hover:bg-indigo-600">
            ₹2999/- Buy Now <BsArrowUpRightCircleFill className="md:text-lg" />
            </button>
           
          </div>

          {/* Business Plan */}
          <div data-aos="fade-left" className="border-y-4 border-2 border-gray-400 p-5 rounded-lg flex flex-col justify-between hover:scale-[105%] h-full transition-all duration-300 ease-in-out">
            <div>
              <h1 className="text-3xl text-center">Business</h1>
              <ul className="list-disc pl-5 space-y-2  mt-5 md:mt-0">
                <li>Send unlimited emails every day</li>
                <li>Get full access to all email templates</li>
                <li>Send bulk emails without any restrictions</li>
                <li>Benefit from secure and high-speed email delivery</li>
                <li>Optimize efficiency with a feature-rich dashboard</li>
                <li>Flexible pricing—Contact us for custom solutions!</li>
              </ul>
            </div>
            <button onClick={()=>plans(2)} className="bg-indigo-500 cursor-pointer text-xl flex items-center gap-x-1 hover:gap-x-5 py-1 text-white justify-center px-4 rounded-md mt-4 transition-all duration-300 ease-in-out hover:bg-indigo-600">
            Contact Us <BsArrowUpRightCircleFill className="md:text-lg" />
            </button>
          </div>
        </div>
      </section>

      {/* templates */}
      <section  id="template" className="pt-36 space-y-5 md:space-y-20 px-[5%]">
        <h1 className="text-3xl md:text-5xl flex font-bold text-gray-700">
          Templates: Making Email Effortless!
        </h1>

        <div className="grid md:grid-cols-4 grid-cols-1 gap-x-10 gap-y-20 md:gap-y-10">
          {templates.map((data, idx) => (
            <div
            data-aos="zoom-in"
              className="bg-gray-100 border border-gray-300 p-4 hover:shadow-2xl rounded-3xl transition-all duration-200 ease-in-out flex flex-col justify-between"
              key={idx}
            >
              <img className="rounded-3xl" src={data.image} alt={data.title} />
              <h1 className="mt-4 text-center text-lg font-semibold">
                {data.title}
              </h1>
              <button onClick={navigateTemplate} href="/try-it" className="bg-gray-900 text-center cursor-pointer hover:bg-indigo-500 rounded-full text-white py-2 transition-all duration-300 ease-in-out">
                Use template
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* contact us */}
      <section data-aos="fade-right" id='contact' className="pt-36 space-y-5 ">
        <h1 className="text-3xl md:text-5xl px-[5%] flex font-bold text-gray-700">
          Contact Us
        </h1>
        <div
          className="bg-cover md:mb-36
            md:py-10 md:px-10 bg-center h-screen w-full rounded-lg"
          style={{ backgroundImage: `url('/contact/contact.png')` }}
          
        >
           <Form/>
        </div>
      </section>

      <Toaster  position="bottom-center"
  reverseOrder={false}/>
    </>
  );
};

export default Homepage;
