import { Link } from "react-router-dom";
function Nav() {
  return (
    <div
      className={`md:bg-transparent bg-[#111] fixed h-14 w-full top-0 left-0 z-50 transition-all duration-[380ms] ease-in`}
    >
      <div className="flex justify-between relative h-full w-full top-0 left-0 px-2 py-1">
        <Link
          to={"/"}
          className="flex justify-center top-0 left-0 w-32 cursor-pointer object-contain"
        >
          <img
            className="h-full "
            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt="netflix_icon"
          />
        </Link>
        <Link
          to={"/account"}
          className="flex items-center top-0 right-0 w-8 mr-8 cursor-pointer object-contain"
        >
          <img
            className=""
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="avatar_icon"
          />
        </Link>
      </div>
    </div>
  );
}

export default Nav;
