import React, { useState } from 'react';

const OtpInput = ({ onVerify }) => {
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val) && val.length <= 6) {
      setOtp(val);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      onVerify(otp);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Verify OTP
        </h2>

        <div className="mb-6">
          <label className="block text-gray-200 font-medium mb-2 text-xl text-center">
            Enter the 6-digit OTP
          </label>
          <input
            type="text"
            value={otp}
            onChange={handleChange}
            placeholder="------"
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-3 px-4 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default OtpInput;
