import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import OtpInput from '../Components/OtpInput'

const VerifyOtp = () => {
    const {state} = useLocation();
    const navigate = useNavigate();

    if(!state){
        return (<p>No Otp request Found. Go Back to Login.</p>)
    }
    const {fullPhone, otp} = state;

    const handleVerify = (enteredOtp) => {
        if(enteredOtp === otp){
            toast.success("OTP Verified!")
            navigate("/dashbord") // go to dashbord
        }else{
            toast.error("Invalid OTP, try again!")
        }
    }
  return (
    <div className='p-4 bg-gray-900'>
      <h2 className='text-lg text-white font-bold'>Verify OTP</h2>
       <p className='text-lg text-white'>OTP Sent to: {fullPhone}</p>
       <OtpInput onVerify={handleVerify}/>
    </div>
  )
}

export default VerifyOtp
