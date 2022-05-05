import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../../firebase";

const SignIn = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        window.localStorage.setItem("logIn", authUser.user.email);

        return navigate("/account");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="mx-auto md:p-[70px] py-8 px-3 bg-[rgba(0,0,0,0.85)] text-center w-full max-w-[360px] rounded-md">
      <form onSubmit={(e) => signIn(e)} className="grid flex-col ">
        <h1 className="md:text-left mb-[30px] text-4xl leading-4">Sign In</h1>
        <input
          type="email"
          ref={emailRef}
          placeholder="Email"
          autoComplete="username"
          className="text-black outline-0 h-[40px] mb-[14px] rounded-[5px] border-none px-[15px] py-[5px] "
        />
        <input
          type="password"
          ref={passwordRef}
          placeholder="Password"
          autoComplete="current-password"
          className="text-black outline-0 h-[40px] mb-[14px] rounded-[5px] border-none px-[15px] py-[5px]"
        />
        <button
          type="submit"
          className="px-[20px] py-[16px] text-base rounded-[5px] bg-[#c50914] font-semibold cursor-pointer mt-[20px]"
        >
          Sign in
        </button>
        <h4 className="md:text-left mt-[30px]">
          <span className="text-[gray]"> New to Netflix?</span>{" "}
          <span
            className="cursor-pointer underline"
            onClick={(e) => register(e)}
          >
            Sign up now.
          </span>
        </h4>
      </form>
    </div>
  );
};

export default SignIn;
