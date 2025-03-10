import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define Validation Schema using Zod
const formSchema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Form submitted successfully!");
  };

  return (
    <div className="max-w-lg ml-auto bg-white p-6 shadow-lg rounded-lg">
    
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block font-medium text-gray-500">Full Name</label>
          <input
            type="text"
            {...register("fullName")}
            className="w-full p-2 border border-gray-400 text-gray-500 rounded-md"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium text-gray-500">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-2 border border-gray-400 text-gray-500 rounded-md"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block font-medium text-gray-500">Phone No.</label>
          <input
            type="text"
            {...register("phone")}
            className="w-full p-2 border border-gray-400 text-gray-500 rounded-md"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block font-medium text-gray-500">Message</label>
          <textarea
            {...register("message")}
            className="w-full p-2 border border-gray-400 text-gray-500 rounded-md"
            rows={4}
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition-all duration-300 ease-in-out disabled:bg-gray-400"
        >
          {isSubmitting ? "Reachinggg..." : "Reach us out"}
        </button>
      </form>
    </div>
  );
}
