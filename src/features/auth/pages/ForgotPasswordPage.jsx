import React from 'react';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import passwordResetImage from '../../../assets/ForgetPassword.jpg'; // تأكد من وجود الصورة في المسار الصحيح

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="flex flex-col md:flex-row items-center gap-12 w-full max-w-6xl">
        <div className="hidden md:block md:w-1/2">
          <img 
            src={passwordResetImage} 
            alt="Password Reset" 
            className="w-full h-auto max-h-[600px] object-contain"
          />
        </div>

        <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;