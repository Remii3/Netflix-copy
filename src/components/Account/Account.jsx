import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import Nav from "../Header/Nav";
import { auth, signOut } from "../../firebase";
import Plans from "./Plans";
import { useNavigate } from "react-router-dom";
import { subscriptionSliceActions } from "../../features/subscriptionSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Account = () => {
  const loggedIn = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  });

  const signOutHandler = () => {
    dispatch(subscriptionSliceActions.clearPlan());
    signOut(auth);
    window.localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="relative bg-black h-screen overflow-y-scroll">
      <Nav />
      {loggedIn ? (
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
      ) : (
        <div className=" flex flex-col w-1/2 pt-[15%] items-center mx-auto  max-w-[800px]">
          <h1 className="p-5 text-5xl">Please sign in</h1>
          <button
            onClick={() => navigate("/login")}
            className="w-[50%] py-2 rounded-lg text-lg  bg-[#c50914]"
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  );
};

export default Account;
