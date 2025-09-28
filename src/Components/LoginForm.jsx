import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ContrySelect from "./ContrySelect"; // Make sure to update this
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const loginSchema = z.object({
  countryCode: z.string().min(1, "Select country code"),
  phone: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^[0-9]+$/, "Only digits allowed"),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const countryCode = watch("countryCode") || "";
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setIsSendingOtp(true);
    const fullPhone = data.countryCode + data.phone;
    console.log("Sending OTP to: ", fullPhone);

    setTimeout(() => {
      const otp = String(Math.floor(100000 + Math.random() * 900000));
      console.log("Generated OTP (for dev):", otp);
      toast.success("OTP Sent!");
      navigate("/verify-otp", { state: { fullPhone, otp } });
      setIsSendingOtp(false);
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Login
        </h2>

        {/* Country Code */}
        <div className="mb-4">
          <label className="block text-gray-200 font-medium mb-2">
            Country Code
          </label>
          <ContrySelect
            value={countryCode}
            onChange={(co) => setValue("countryCode", co)}
            // className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.countryCode && (
            <p className="text-red-400 text-sm mt-1">{errors.countryCode.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="mb-6">
          <label className="block text-gray-200 font-medium mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            inputMode="numeric"
            pattern="[0-9]{10}"
            {...register("phone")}
            placeholder="Enter Mobile Number"
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && (
            <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSendingOtp}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
            isSendingOtp
              ? "bg-blue-600 cursor-not-allowed text-gray-200"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {isSendingOtp ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
