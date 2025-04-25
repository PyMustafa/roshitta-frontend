import React from 'react';
import RegisterForm from "../components/RegisterForm";
import loginBannerImage from '../../../assets/login-banner.png';

const RegisterPage = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-5xl">
          <div className="hidden md:block w-3/5">
            <img 
              src={loginBannerImage} 
              alt="Register Banner" 
              className="w-full h-auto max-h-[500px] object-contain"
            />
          </div>
          
          <div className="w-full md:w-3/5 bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <RegisterForm />
          </div>
        </div>
      </div>
    );
};

export default RegisterPage;