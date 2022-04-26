import {
  PlusCircleIcon,
  ThumbUpIcon as OutThumbUp,
} from "@heroicons/react/outline";
import {
  CheckCircleIcon,
  ThumbUpIcon as SolidThumbUp,
} from "@heroicons/react/solid";

import { useState } from "react";

const Film = ({ isLargeRow, movie, genres }) => {
  const [stats, setStats] = useState({ liked: false, inList: false });
  const BASE_URL = "https://image.tmdb.org/t/p/original/";

  const likeHandler = () => {
    setStats((prev) => {
      return { liked: !prev.liked, inList: prev.inList };
    });
  };

  const addToMyList = () => {
    setStats((prev) => {
      return { liked: prev.liked, inList: !prev.inList };
    });
  };

  const filteredGenres = genres
    .filter((el) => {
      return movie.genre_ids.find((e) => {
        return e === el.id;
      });
    })
    .slice(0, 3);

  return (
    <div
      className={`relative scale-95 hover:scale-100 flex-[0_0_auto]  bg-[rgb(37,37,37)] transition duration-200 group-scope`}
    >
      <img
        className={` ${isLargeRow ? "max-h-[400px] " : "max-h-[200px] "}`}
        key={movie.id}
        src={`${BASE_URL}${
          isLargeRow ? movie.poster_path : movie.backdrop_path
        }`}
        alt={movie.name}
      />
      <div
        className={`absolute w-full min-h-[92px] bottom-0 left-0 px-2 opacity-0    bg-[rgba(51,51,51,0.8)] transition-all transform duration-200 group-scope-hover:opacity-100`}
      >
        <p className="text-lg">
          {movie?.title || movie?.name || movie?.original.name}
        </p>
        <p className="my-1">
          <span className="mr-2">
            {stats.inList ? (
              <CheckCircleIcon
                className=" inline-block max-h-7 cursor-pointer   "
                onClick={addToMyList}
              />
            ) : (
              <PlusCircleIcon
                className=" inline-block max-h-7 cursor-pointer  hover:animate-bounce transition-all duration-200"
                onClick={addToMyList}
              />
            )}
          </span>
          <span className="mr-2">
            {stats.liked ? (
              <SolidThumbUp
                onClick={likeHandler}
                className=" inline-block max-h-7 cursor-pointer  "
              ></SolidThumbUp>
            ) : (
              <OutThumbUp
                onClick={likeHandler}
                className=" inline-block max-h-7 cursor-pointer  hover:animate-bounce transition-all duration-200"
              />
            )}
          </span>
        </p>
        <p className="m-[4px_0_2px] flex flex-wrap">
          {filteredGenres.map((genre) => (
            <span
              key={genre.id}
              className="px-2 py-1 m-[2px_2px_2px_0] text-md font-light bg-[rgba(51,51,51,1)] rounded-xl cursor-pointer hover:bg-[rgba(60,60,60,1)] transition-all duration-200"
            >
              {genre.name}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default Film;
