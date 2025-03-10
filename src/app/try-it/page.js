"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Image from "next/image";
import { ScaleLoader } from "react-spinners";
import useStore from "@/Store/UserStore";
const templates = {
  Interview: {
    name: "Interview",
    fields: [
      { name: "candidateName", label: "Candidate Name", type: "text" },
      { name: "jobTitle", label: "Job Title", type: "text" },
      { name: "companyName", label: "Company Name", type: "text" },
      { name: "date", label: "Date", type: "date" },
      { name: "time", label: "Time", type: "time" },
      { name: "meetingLink", label: "Meeting Link", type: "url" },
      { name: "interviewerName", label: "Interviewer Name", type: "text" },
    ],
    schema: z.object({
      candidateName: z.string().min(2, "Candidate name is required"),
      jobTitle: z.string().min(2, "Job title is required"),
      companyName: z.string().min(2, "Company name is required"),
      date: z.string().min(1, "Date is required"),
      time: z.string().min(1, "Time is required"),
      meetingLink: z.string().url("Invalid meeting link URL"),
      interviewerName: z.string().min(2, "Interviewer name is required"),
    }),
  },

  ProductLaunch: {
    name: "Product Launch",
    fields: [
      { name: "customerName", label: "Customer Name", type: "text" },
      { name: "productName", label: "Product Name", type: "text" },
      { name: "productCategory", label: "Product Category", type: "text" },
      { name: "yourName", label: "Your Name", type: "text" },
      { name: "companyName", label: "Company Name", type: "text" },
    ],
    schema: z.object({
      customerName: z.string().min(2, "Customer name is required"),
      productName: z.string().min(2, "Product name is required"),
      productCategory: z.string().min(2, "Product category is required"),
      yourName: z.string().min(2, "Your name is required"),
      companyName: z.string().min(2, "Company name is required"),
    }),
  },

  PromotionAnnouncement: {
    name: "Promotion Announcement",
    fields: [
      {
        name: "promotedEmployeeName",
        label: "Promoted Employee Name",
        type: "text",
      },
      { name: "newPosition", label: "New Position", type: "text" },
      { name: "companyName", label: "Company Name", type: "text" },
      { name: "yourName", label: "Your Name", type: "text" },
    ],
    schema: z.object({
      promotedEmployeeName: z.string().min(2, "Employee name is required"),
      newPosition: z.string().min(2, "New position is required"),
      companyName: z.string().min(2, "Company name is required"),
      yourName: z.string().min(2, "Your name is required"),
    }),
  },

  SubscribeNewsletter: {
    name: "Subscribe Newsletter",
    fields: [
      { name: "username", label: "User Name", type: "text" },
      { name: "yourName", label: "Your Name", type: "text" },
      { name: "newsletterLink", label: "Newsletter Link", type: "url" },
    ],
    schema: z.object({
      username: z.string().min(2, "User name is required"),
      yourName: z.string().min(2, "Your name is required"),
      newsletterLink: z.string().url("Invalid URL"),
    }),
  },

  TeamMeetingInvitation: {
    name: "Team Meeting Invitation",
    fields: [
      { name: "date", label: "Date", type: "date" },
      { name: "time", label: "Time", type: "time" },
      { name: "meetingLink", label: "Meeting Link", type: "url" },
      { name: "agenda", label: "Agenda", type: "text" },
      { name: "yourName", label: "Your Name", type: "text" },
      { name: "companyName", label: "Company Name", type: "text" },
    ],
    schema: z.object({
      date: z.string().min(1, "Date is required"),
      time: z.string().min(1, "Time is required"),
      meetingLink: z.string().url("Invalid meeting link URL"),
      agenda: z.string().min(2, "Agenda is required"),
      yourName: z.string().min(2, "Your name is required"),
      companyName: z.string().min(2, "Company name is required"),
    }),
  },

  WelcomeAboard: {
    name: "Welcome Aboard",
    fields: [
      { name: "employeeName", label: "Employee Name", type: "text" },
      { name: "companyName", label: "Company Name", type: "text" },
      { name: "joiningDate", label: "Joining Date", type: "date" },
      { name: "department", label: "Department", type: "text" },
      { name: "managerName", label: "Manager of Department", type: "text" },
      { name: "yourName", label: "Your Name", type: "text" },
    ],
    schema: z.object({
      employeeName: z.string().min(2, "Employee name is required"),
      companyName: z.string().min(2, "Company name is required"),
      joiningDate: z.string().min(1, "Joining date is required"),
      department: z.string().min(2, "Department name is required"),
      managerName: z.string().min(2, "Manager name is required"),
      yourName: z.string().min(2, "Your name is required"),
    }),
  },
};

export default function MsendForm() {
  const [emails, setEmails] = useState([]);
  const [emailInput, setEmailInput] = useState("");
  const [Loading, setLoading] = useState(false);
  const {UserEmail} = useStore()
  const [selectedImage, setSelectedImage] = useState(null);
  const template = [
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
  const [selectedTemplate, setSelectedTemplate] = useState(
    "PromotionAnnouncement"
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(templates[selectedTemplate].schema),
  });

  const handleTemplateChange = (e) => {
    setSelectedTemplate(e.target.value);
    reset(); // Reset form when template changes
    setEmails([]); // Reset emails
  };

  const handleAddEmail = () => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailInput || !emailRegex.test(emailInput)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!emails.includes(emailInput)) {
      setEmails([...emails, emailInput]);
      setValue("emails", [...emails, emailInput]); // Update react-hook-form value
    }

    setEmailInput(""); // Clear input field
  };

  const handleRemoveEmail = (index) => {
    const updatedEmails = emails.filter((_, i) => i !== index);
    setEmails(updatedEmails);
    setValue("emails", updatedEmails); // Update react-hook-form value
  };

  // sender api function
  const onSubmit = async (data) => {
    if (emails.length === 0) {
      alert("Please add at least one email before sending.");
      return;
    }
    const payload = {
      ...data,
      emails,
      UserEmail,
      selectedTemplate, // Replace with the actual template name
    };
    console.log("data of form",payload);
    
    try {
      setLoading(true)
      const response = await fetch("/api/sender", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to send data");
      }

      const result = await response.json();
      console.log("Success:", result);
      alert("Mail sent successfully!");
      
    } catch (error) {
      
      console.error("Error:", error);
      alert("Error sending mail. Please try again.");
    }
    finally{
      reset()
      setLoading(false)
    }
  };

  return (
    <>
      <section
        data-aos="zoom-in"
        className="md:flex space-y-20 md:space-y-0 justify-between items-center mt-36 md:mt-20 px-[5%]"
      >
        <div className="space-y-5 md:w-1/3">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-700 leading-[110%]">
            <a className="bg-indigo-500 text-white px-4 rounded-md leading-12">
              Scroll down
            </a>{" "}
            &ndash; to see all email template previews
          </h1>
          <p className="text-gray-500 text-lg md:text-sm">
            Discover a collection of modern and professional email templates.
            Whether you need newsletters, promotions, or personal messages,
            MSend makes sending emails effortless and efficient.
          </p>
          <Link href="#preview">
            <button className="bg-indigo-500 text-lg hover:bg-indigo-700 px-2 py-1 text-white rounded-sm transition-all duration-300 ease-in-out flex items-center gap-x-1 md:hover:gap-x-5 cursor-pointer">
              See Templates{" "}
              <MdKeyboardDoubleArrowRight className="text-2xl md:text-xl" />
            </button>
          </Link>
        </div>

        {/* Form to send mail */}
        <div className="md:w-full max-w-[30rem] text-black p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl text-center font-bold mb-4 bg-yellow-500 rounded-md px-4 py-1">
            Send Secure E-Mails
          </h2>

          {/* Template Selection */}
          <label className="block text-sm font-semibold">
            Select Template:
          </label>
          <select
            value={selectedTemplate}
            onChange={handleTemplateChange}
            className="w-full p-2 border rounded mb-4"
          >
            {Object.keys(templates).map((key) => (
              <option key={key} value={key}>
                {templates[key].name}
              </option>
            ))}
          </select>

          {/* Dynamic Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {templates[selectedTemplate]?.fields.map((field) => (
              <div key={field.name} className="mb-3">
                <label className="block text-sm font-semibold">
                  {field.label}:
                </label>
                <input
                  type={field.type}
                  {...register(field.name)}
                  className="w-full p-2 border rounded"
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-sm">
                    {errors[field.name]?.message}
                  </p>
                )}
              </div>
            ))}

            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Emails:</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter email"
                />
                <button
                  type="button"
                  onClick={handleAddEmail}
                  className="bg-indigo-500 cursor-pointer text-white px-3 py-1 rounded"
                >
                  Add
                </button>
              </div>
              {errors.emails && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.emails?.message}
                </p>
              )}
            </div>

            {/* Display Added Emails */}
            {emails.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-semibold">Added Emails:</p>
                <ul className="space-y-2">
                  {emails.map((email, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-gray-100 p-2 rounded"
                    >
                      <span className="text-sm">{email}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveEmail(index)}
                        className="text-red-600 bg-gray-300 px-1 rounded-sm py-1 cursor-pointer text-sm"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              type="submit"
              disabled={emails.length < 0}
              className="w-full mt-4 cursor-pointer bg-blue-500 text-white p-2 rounded hover:bg-blue-600 items-center flex justify-center gap-x-3"
            >
              {Loading ? (
                <>
                  Sending <ScaleLoader height={20} color="white" />
                </>
              ) : (
                "Send Email"
              )}
            </button>
          </form>
        </div>
      </section>

      <section id="preview" className="py-20 space-y-5 md:space-y-20 px-[5%]">
        <h1 className="text-3xl md:text-5xl flex font-bold text-gray-700">
          Templates: Making Email Effortless!
        </h1>

        <div className="grid md:grid-cols-4 grid-cols-1 gap-x-10 gap-y-20 md:gap-y-10">
          {template.map((data, idx) => (
            <div
              data-aos="zoom-in"
              className="bg-gray-100 border border-gray-300 p-4 hover:shadow-2xl rounded-3xl transition-all duration-200 ease-in-out flex flex-col justify-between"
              key={idx}
            >
              <img className="rounded-3xl" src={data.image} alt={data.title} />
              <h1 className="mt-4 text-center text-lg font-semibold">
                {data.title}
              </h1>
              <button
                onClick={() => setSelectedImage(data.image)}
                className="bg-gray-900 text-center cursor-pointer hover:bg-indigo-500 rounded-full text-white py-2 transition-all duration-300 ease-in-out"
              >
                Preview Template
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* template popup */}
      {selectedImage && (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-lg border border-gray-400">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-gray-400 cursor-pointer hover:bg-gray-300 hover:text-black text-white px-1 rounded-sm transition-all duration-300 ease-in-out"
            >
              ✕
            </button>
            <Image
              src={selectedImage}
              alt="Preview"
              width={500}
              height={400}
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
