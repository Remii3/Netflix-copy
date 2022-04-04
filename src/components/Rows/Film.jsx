import {
  ThumbUpIcon as SolidThumbUp,
  CheckCircleIcon,
} from "@heroicons/react/solid";
import {
  ThumbUpIcon as OutThumbUp,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import { useState } from "react";

function Film({ isLargeRow, movie, genres }) {
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

  const filteredGenres = genres.filter((el) => {
    return movie.genre_ids.find((e) => {
      return e === el.id;
    });
  });

  return (
    <div
      className={`relative z-10 mr-[15px] transition-all transform duration-[250ms] md:hover:z-30  flex-[0_0_auto] group  bg-[rgb(37,37,37)]  md:hover:scale-[1.2]`}
    >
      <img
        className={`${isLargeRow ? "max-h-[350px] " : "max-h-[150px] "}`}
        key={movie.id}
        src={`${BASE_URL}${
          isLargeRow ? movie.poster_path : movie.backdrop_path
        }`}
        alt={movie.name}
      />
      <div
        className={`absolute w-full z-10 bottom-0 left-0 px-2 opacity-0   group-hover:opacity-100 bg-[rgba(51,51,51,0.8)] transition-all transform duration-200 `}
      >
        <p>{movie?.title || movie?.name || movie?.original.name}</p>
        <p>
          <span className="p-1">
            {stats.inList ? (
              <CheckCircleIcon
                onClick={addToMyList}
                className="relative inline-block max-h-5 cursor-pointer transition-all  "
              />
            ) : (
              <PlusCircleIcon
                onClick={addToMyList}
                className="relative inline-block max-h-5 cursor-pointer transition-all duration-200 transform hover:animate-bounce"
              />
            )}
          </span>
          <span className="p-1">
            {stats.liked ? (
              <SolidThumbUp
                onClick={likeHandler}
                className="relative inline-block max-h-5 cursor-pointer transition-all "
              ></SolidThumbUp>
            ) : (
              <OutThumbUp
                onClick={likeHandler}
                className="relative inline-block max-h-5 cursor-pointer transition-all duration-200 transform hover:animate-bounce"
              />
            )}
          </span>
        </p>
        <p className="my-[10px]">
          {filteredGenres.map((genre) => (
            <span
              key={genre.id}
              className="p-1 mx-[2px] text-sm font-light bg-[rgba(51,51,51,1)] rounded-xl cursor-pointer hover:bg-[rgba(60,60,60,1)] transition-all duration-150"
            >
              {genre.name}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

export default Film;
