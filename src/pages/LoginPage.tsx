import React from "react";
import googleLogo from "../assets/images/google-logo.png";

const LoginPage: React.FC = () => {
  const googleLogin = () => {
    window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/google`, "_self");
  }

  return (
    <div className="my-12 w-fit mx-auto">
      <div className="flex flex-col gap-8 items-center">
        <button onClick={googleLogin}
          className="bg-monel-blue hover:scale-105 pl-4 pr-8 py-4 font-montserrat font-light text-2xl
          text-monel-gray inline-flex justify-between items-center gap-4">
          <img src={googleLogo} alt="Google Logo" className="aspect-square w-12" />
          <span>Sign in With Google</span>
        </button>

        <div>
          <p className="font-texturina text-2xl text-center">
            Click to log in using your Google account.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;