"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { signIn, signOut, useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useStore from "@/Store/UserStore";

const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .max(50, "Email must be at most 50 characters"),
  password: z.string().min(10, "Password must be at least 10 characters"),
});

const registerSchema = loginSchema
  .extend({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters"),
    confirmPassword: z
      .string()
      .min(10, "Password must be at least 10 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


  
const DelayedPopup = ({ isOpen ,close})=> {

  const { LoginUser, AllowUser } = useStore();

  const { data: session } = useSession();
  
  const [showPopup, setShowPopup] = useState(false);
  const [delay, setDelay] = useState(10000);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (session) {
      console.log("Session Updated:", session);
      console.log("User Name:", session.user?.name);
      console.log("User Email:", session.user?.email);
      console.log("profile Photo:",session.user?.image);
      AllowUser()
    }
  }, [session]);

  useEffect(()=>{
    console.log("Login usr", LoginUser);
    
  },[LoginUser])
  const closePopup = () => {
    
    setShowPopup(false);
    close()
    setDelay((prevDelay) => prevDelay + 1000); // Increase delay by 50s
  };
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
  });

  const onSubmit = (data) => {
    setLoading(true);
    console.log(isRegister ? "Register Data:" : "Login Data:", data);
  };

  

  // Form submit handler

  return (
    <>
      {(showPopup || isOpen ) && (LoginUser === 0) && (
       <div className={`fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50`}>

          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full overflow-hidden mt-10">
            <div className="flex flex-col md:flex-row border border-gray-300 rounded-xl">
              {/* Left Side */}
              <div className="hidden md:flex bg-gray-100 w-1/2 relative bg-[url('https://i.pinimg.com/736x/1a/8a/c8/1a8ac8d20e7caf92a542645cdcbcb019.jpg')] bg-cover bg-center bg-no-repeat">
                <div className="absolute justify-center items-center inset-0 bg-black/10 flex flex-col font-sans text-white px-5 text-center">
                  <h1 className="text-4xl font-bold text-gray-700 bg-white/20 backdrop-blur-xs p-2 rounded-full">
                    Start Your Free Email Marketing Trial Today
                  </h1>
                  <img
                    className="h-10 w-10 justify-center mx-auto"
                    src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWc5eHk3cHNqdWZxMXBzaXM5Nzh2NHVpeDZ0czk1emNsdzczMTU5YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/YPsO2ShzhUbH3CWxVl/giphy.gif"
                  />
                  <p className="text-lg mt-2 bg-white/20 backdrop-blur-xs px-4 text-gray-600 rounded-full">
                    No hidden costs—Start for free!
                  </p>

                  <ul className="mt-4 text-black bg-white/10 backdrop-blur-xs p-1 rounded-xl text-sm text-left font-mono space-y-2 max-w-md">
                    <li className="flex items-center gap-2">
                      -{" "}
                      <span>
                        Send up to <strong>500 emails per day</strong>
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      -{" "}
                      <span>
                        Get access to <strong>10 free email templates</strong>
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      -{" "}
                      <span>
                        Send up to <strong>100 emails in a single batch</strong>
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      -{" "}
                      <span>
                        Enjoy{" "}
                        <strong>secure and reliable email delivery</strong>
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      -{" "}
                      <span>
                        Manage emails easily with our{" "}
                        <strong>intuitive dashboard</strong>
                      </span>
                    </li>
                  </ul>
                  <img
                    className="h-5 w-20 mt-5 justify-center mx-auto"
                    src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGx4M3Fsazc1NWNscmZkdG5oajczdnllYngxNnhnbHF6ZjhzbWNxYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/dVK7fduLI0scujoqM1/giphy.gif"
                  />
                </div>
              </div>

              {/* Right Side */}
              <div className="w-full md:w-1/2 p-3 md:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-3xl text-gray-500 hidden md:block font-sans">Start Your Free Trail</h1>
                    <h1 className="text-xl text-gray-500 block md:hidden font-sans text-center">Start Your Free Trail</h1>
                  </div>

                  <button
                    onClick={closePopup}
                    className="text-gray-900 bg-gray-300 px-2 md:hover:text-gray-100 hover:bg-gray-600 rounded-md cursor-pointer transition-all duration-300 ease-in-out"
                    aria-label="Close popup"
                  >
                    ✕
                  </button>
                </div>

                {/* Login/Register Form */}
                <section className=" h-96 overflow-y-auto border border-gray-200 rounded-sm mx-auto space-y-5 shadow-2xl  md:p-6">
                  <div className="flex mt-5 rounded-sm p-1 items-center justify-between bg-gray-200 gap-x-2 mx-[10%] ">
                    <button
                      className={`transition-all duration-1000 ease-in-out md:px-8 w-full md:text-lg rounded-sm ${
                        !isRegister
                          ? "bg-indigo-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                      onClick={() => setIsRegister(false)}
                    >
                      Login
                    </button>
                    <button
                      className={`transition-all duration-1000 ease-in-out md:px-8 w-full md:text-lg rounded-sm ${
                        isRegister
                          ? "bg-indigo-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                      onClick={() => setIsRegister(true)}
                    >
                      Register
                    </button>
                  </div>
                  <h1 className="text-center font-bold">
                    {isRegister ? "Register with" : "Sign in with"}
                  </h1>
                  <div className="flex gap-x-5 justify-center">
                    {/* <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png"
                      className="h-10 w-10 cursor-pointer rounded-md p-1 border border-gray-300"
                    /> */}
                    <img
                      onClick={() => signIn("google")}
                      src="https://cdn.iconscout.com/icon/free/png-256/free-google-logo-icon-download-in-svg-png-gif-file-formats--brands-pack-logos-icons-189824.png?f=webp&w=128"
                      className="h-10 w-10 cursor-pointer rounded-md p-1 border border-gray-300"
                    />
                  </div>
                  {/* <h1 className="text-center font-bold">or</h1> */}

                  {/* <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 px-6"
                  >
                    {isRegister && (
                      <div>
                        <label className="block text-sm text-gray-500">
                          Name
                        </label>
                        <input
                          type="text"
                          {...register("name")}
                          className="w-full border border-gray-300 p-2 rounded"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                    )}
                    <div>
                      <label className="block text-sm text-gray-500">
                        Email
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        className="w-full border border-gray-300 p-2 rounded"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500">
                        Password
                      </label>
                      <input
                        type="password"
                        {...register("password")}
                        className="w-full border border-gray-300 p-2 rounded"
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    {isRegister && (
                      <div>
                        <label className="block text-sm text-gray-500">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          {...register("confirmPassword")}
                          className="w-full border border-gray-300 p-2 rounded"
                        />
                        {errors.confirmPassword && (
                          <p className="text-red-500 text-sm">
                            {errors.confirmPassword.message}
                          </p>
                        )}
                      </div>
                    )}
                    <p className="text-center mt-4 text-xs">
                      Can't Remember your password?
                      <button className="text-red-500 hover:text-red-700 hover:font-bold underline ml-1">
                        Click here
                      </button>
                    </p>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-b from-indigo-500 to-indigo-700 text-white p-2 rounded hover:bg-gradient-to-b hover:from-indigo-900 hover:to-blue-700"
                    >
                      {isRegister ? "Register" : "Login"}
                    </button>
                  </form> */}
                  {/* <p className="text-center mt-4 text-sm">
                    {isRegister
                      ? "Already have an account?"
                      : "Don't have an account?"}
                    <button
                      onClick={() => setIsRegister(!isRegister)}
                      className="text-blue-500 underline ml-1 hover:font-bold hover:text-blue-700"
                    >
                      {isRegister ? "Login" : "Register"}
                    </button>
                  </p> */}
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DelayedPopup;

