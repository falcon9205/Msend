"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/navigation";
import useStore from "@/Store/UserStore";

const Page = () => {
  const { LoginUser, UserEmail } = useStore();
  const [profileData, setProfileData] = useState({});
  const [historyData, setHistoryData] = useState([]);
  const router = useRouter();

  const fetchProfiles = async () => {
    try {
      console.log("Fetching all profiles...");

      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: UserEmail }),
      });

      const data = await response.json();
      console.log("Fetched User Data:", data);

      setProfileData(data.users || {});
      setHistoryData(Array.isArray(data.history) ? data.history : []);
    } catch (error) {
      console.error("Failed to fetch profiles:", error.message);
    }
  };

  useEffect(() => {
    if (!UserEmail) return;
    fetchProfiles();
  }, [UserEmail]);

  useEffect(() => {
    if (LoginUser === 0 || !UserEmail) {
      router.push("/");
    }
  }, [LoginUser, UserEmail, router]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const columns = historyData.length > 0 ? [...new Set(historyData.flatMap(Object.keys))] : [];

  return (
    <>
      <section className="md:mt-20 mt-36 px-[5%] pb-44">
        <div className="md:flex md:gap-x-10 space-y-10 md:space-y-0 items-center">
          {/* Personal Info Table */}
          <div data-aos="zoom-in" className="md:w-1/2">
            <table className="text-xs md:text-sm border-gray-300 w-full bg-gray-200 shadow-md rounded-xl">
              <tbody>
                <tr className="border-b border-gray-400">
                  <th className="px-4 py-2 text-left text-gray-700">Profile Photo</th>
                  <td className="px-4 py-2">
                    <img
                      className="rounded-full w-16 h-16 object-cover"
                      src={profileData.profilePhoto || "https://cdn-icons-png.flaticon.com/512/813/813728.png"}
                      alt="Profile"
                    />
                  </td>
                </tr>
                <tr className="border-b border-gray-400">
                  <th className="px-4 py-2 text-left text-gray-700">Full Name</th>
                  <td className="px-4 py-2 text-gray-700">{profileData.fullName || "N/A"}</td>
                </tr>
                <tr className="border-gray-400">
                  <th className="px-4 py-2 text-left text-gray-700">Registered Email</th>
                  <td className="px-4 py-2 text-gray-700">{profileData.email || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Registration Date Table */}
          <div data-aos="zoom-in" className="md:w-1/2">
            <table className="text-xs md:text-sm border-gray-300 w-full bg-gray-200 shadow-md rounded-xl">
              <tbody>
                <tr className="border-b border-gray-400">
                  <th className="px-4 py-2 text-left text-gray-700">Registered Date</th>
                  <td className="px-4 py-2 text-gray-700">{profileData.createdAt || "N/A"}</td>
                </tr>
                <tr className="border-b border-gray-400">
                  <th className="px-4 py-2 text-left text-gray-700">Updated Date</th>
                  <td className="px-4 py-2 text-gray-700">{profileData.updatedAt || "N/A"}</td>
                </tr>
                <tr>
                  <th className="px-4 py-2 text-left text-gray-700">User Plan</th>
                  <td className="px-4 py-2 text-gray-700">Basic</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* History Table */}
        <div data-aos="zoom-in" className="mt-10">
          <div className="w-full overflow-x-auto">
            {historyData.length > 0 ? (
              <table className="text-xs md:text-sm min-w-full border-gray-300 bg-gray-200 shadow-md rounded-xl whitespace-nowrap">
                <thead>
                  <tr className="text-gray-700">
                    {columns.map((col) => (
                      <th key={col} className="px-4 py-2 text-left border-r last:border-none">
                        {col.replace(/_/g, " ").toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
  {historyData.map((item, index) => (
    <tr key={index} className="border-t hover:bg-gray-100 text-gray-700">
      {columns.map((col) => {
        const value = item[col];

        return (
          <td key={col} className="px-4 py-2 border-r last:border-none">
            {Array.isArray(value)
              ? value.join(", ") // Convert arrays to a comma-separated string
              : typeof value === "object" && value !== null
              ? JSON.stringify(value) // Convert objects to JSON string
              : value || "-"} {/* Show "-" if value is undefined or null */}
          </td>
        );
      })}
    </tr>
  ))}
</tbody>

              </table>
            ) : (
              <p className="text-center text-gray-500">No history available</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
