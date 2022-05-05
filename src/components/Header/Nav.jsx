import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import netflixLogo from "../../assets/netflix_logo.png";
import netflixAvatar from "../../assets/Netflix_avatar.png";
const Nav = (props) => {
  const { signIn } = props;
  const [show, setShow] = useState(false);
  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  const loggedIn = window.localStorage.getItem("logIn");
  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);
    return () => window.removeEventListener("scroll", transitionNavbar);
  }, []);

  return (
    <div
      className={`${
        show && "bg-mainBlack"
      } fixed h-14 w-full top-0 left-0 z-50 transition-all duration-[380ms] ease-in`}
    >
      <div className="flex justify-between relative h-full w-full top-0 left-0 px-2 py-1">
        <Link
          to={"/"}
          className="flex justify-center top-0 left-0 w-32 cursor-pointer object-contain"
        >
          <img className="h-full " src={netflixLogo} alt="netflix_icon" />
        </Link>
        {loggedIn ? (
          <Link
            to={"/account"}
            className="flex items-center top-0 right-0 w-8 mr-8 cursor-pointer object-contain"
          >
            <img className="" src={netflixAvatar} alt="avatar_icon" />
          </Link>
        ) : (
          <button
            className="relative top-0 right-0 bg-[#c50914] py-[10px] px-5 mr-8 cursor-pointer font-semibold"
            onClick={signIn}
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};

export default Nav;
