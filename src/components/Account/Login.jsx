import { useState } from "react";
import Nav from "../Header/Nav";

import SignIn from "./SignIn";

const Login = () => {
  const [signIn, setSignIn] = useState(false);

  const sighInHandler = (state) => {
    setSignIn(state);
  };

  return (
    <div className="relative bg-[url(https://assets.nflxext.com/ffe/siteui/vlv3/757ab38f-5d08-40bc-b3eb-eaba63ed8203/93c34f94-56c8-40a7-8b2e-b4aac6427977/GB-en-20210125-popsignuptwoweeks-perspective_alpha_website_medium.jpg)] h-screen ">
      <Nav signIn={sighInHandler} />
      <div className="h-screen bg-[rgba(0,0,0,0.4)] z-[1] bg-gradient-to-t from-[rgba(0,0,0,0.8)] via-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.8)]" />

      <div className="absolute top-[10%] md:top-30 mx-auto left-0 right-0 p-5 text-center w-full ">
        {signIn ? (
          <SignIn />
        ) : (
          <>
            <h1 className="mb-5 md:text-5xl text-4xl ">
              Unlimited films, TV programmes and more.
            </h1>
            <h2 className="text-2xl font-normal mb-[30px]">
              Watch anywhere. Cancel at any time.
            </h2>
            <h3 className="text-md font-normal">
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>
            <div className="m-5">
              <form>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="px-[10px] py-[16px] outline-0 text-black md:w-[30%]  max-w-[600px] border-none"
                />
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setSignIn(true);
                  }}
                  className="px-[20px] py-[16px] border-0 bg-[#c50914] font-semibold cursor-pointer mt-2 md:mt-0"
                >
                  GER STARTED
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
