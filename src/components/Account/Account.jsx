import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { subscriptionSliceActions } from "../../features/subscriptionSlice";
import { selectUser } from "../../features/userSlice";

import Nav from "../Header/Nav";
import Plans from "./Plans";

const Account = () => {
  const loggedIn = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOutHandler = () => {
    dispatch(subscriptionSliceActions.clearPlan());
    window.localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    !window.localStorage.getItem("logIn") && navigate("/login");
  }, [navigate]);

  return (
    <div className="relative bg-black h-screen overflow-y-scroll">
      <Nav />
      <div className="flex flex-col md:w-1/2 w-3/4 md:pt-[8%] pt-[20%] top-[30%] mx-auto my-4  max-w-[800px]">
        <h1 className="mb-[20px] border-b-[1px] border-b-[#282c2d] text-6xl">
          Edit Profile
        </h1>
        <div className="flex md:flex-row flex-col">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="avatar"
            className="md:h-[100px] md:max-w-[100px] w-1/2 mx-auto mb-4"
          />
          <div className="md:ml-[25px] flex-1">
            <h2 className="p-[15px] bg-[gray] pl-[20px] text-sm">
              {loggedIn?.email}
            </h2>
            <div className="mt-[20px] ">
              <h3 className="pb-[10px] border-b-[1px] border-b-[#282c2d]">
                Plans
              </h3>
              {loggedIn && <Plans />}
              <button
                onClick={() => signOutHandler()}
                className="text-base px-[20px] py-[10px] mt-[5%] w-full cursor-pointer bg-[#c50914]"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
