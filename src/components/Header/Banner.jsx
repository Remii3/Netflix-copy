import { useEffect, useState } from "react";

import axiosLoc from "../../request/axios";
import requests from "../../request/requests";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axiosLoc.get(requests.fetchNetflixOriginals);

        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length - 1)
          ]
        );

        return request;
      } catch (err) {
        throw new Error(err);
      }
    };

    fetchData();
  }, []);

  const truncate = (string, n) => {
    return string.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  if (movie && movie.length < 1) return <>Loading</>;

  return (
    <header
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
      }}
      className={"bg-cover bg-center h-96 relative object-fill"}
    >
      <div className="ml-10 pt-32">
        <h1 className=" text-5xl font-bold pb-2">
          {movie?.title || movie?.name || movie?.original.name}
        </h1>
        <div>
          {["Play", "My list"].map((text, index) => (
            <button
              key={index}
              className="outline-none border-none font-bold rounded-md px-8 mr-4 py-2 bg-[rgba(51,51,51,0.5)] hover:text-black hover:bg-[#e6e6e6] transition-all duration-200 cursor-pointer"
            >
              {text}
            </button>
          ))}
        </div>
        <p className="leading-5 pt-5 text-base font-normal max-w-sm h-16 ">
          {truncate(movie?.overview, 150)}
        </p>
      </div>

      <div className="h-24 w-full absolute left-0 bottom-0 bg-gradient-to-b from-transparent  via-[rgba(37,37,37,0.61)] to-[#111] " />
    </header>
  );
};

export default Banner;
