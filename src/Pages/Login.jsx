import React, {useState} from 'react';
import LoginForm from '../Components/LoginForm.jsx';
import OtpInput from '../Components/OtpInput.jsx';
import { toast } from 'react-toastify';

const Login = () => {
    const [ otpSentTo, setOtpSentTo ] = useState(null);
    const [ generatedOtp, setGeneratedOtp ] = useState(null);
    const [ isVerified, setIsVerified ] = useState(false);

    const handleOtpSend = (phone, otp) => {
        setOtpSentTo(phone);
        setGeneratedOtp(otp);
    };

    const handleOtpVerify = (enteredOtp) => {
        if(enteredOtp === generatedOtp){
            toast.success("Verified! 🎊");
            setIsVerified(true);
            // store auth, redirect to dashbord....
        }else{
            toast.error("Incorrect OTP")
        }
    };
    if(!otpSentTo){
        return <LoginForm otpSentTo={handleOtpSend} />
    }
  return (
    <div>
      <OtpInput onVerify={handleOtpVerify} />
    </div>
  )
}

export default Login
