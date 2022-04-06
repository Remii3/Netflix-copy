import React, { useEffect, useState } from "react";

import axiosLoc from "../../request/axios";

import Film from "./Film";

import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/outline";
function Row({ title, fetchUrl, isLargeRow = false, genres }) {
  const [movies, setMovies] = useState([]);
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const movies = await axiosLoc.get(fetchUrl);
        setMovies(movies.data.results);

        return movies;
      } catch (err) {
        throw new Error(err);
      }
    }

    fetchData();
  }, [fetchUrl]);

  const leftArrowHandle = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const rightArrowHandle = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = movies.length * (isLargeRow ? 271.4 : 359.8);
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW;
    }
    setScrollX(x);
  };

  return (
    <div className="mx-5 mb-2 p-4 group-scope">
      <h2 className="pb-1">{title}</h2>
      <div
        className={`hidden w-[48px] absolute  bg-[rgba(0,0,0,0.6)] left-0 z-20 md:flex items-center justify-center overflow-hidden cursor-pointer opacity-0 group-scope-hover:opacity-100 transition-all ease-in-out duration-200  ${
          isLargeRow ? "h-[400px]" : "h-[200px]"
        }`}
        onClick={() => leftArrowHandle()}
      >
        <ArrowLeftIcon />
      </div>
      <div
        className={`hidden w-[48px] absolute bg-[rgba(0,0,0,0.6)] right-0 z-20 md:flex items-center justify-center overflow-hidden cursor-pointer opacity-0 group-scope-hover:opacity-100 transition-all duration-200 ${
          isLargeRow ? "h-[400px]" : "h-[200px]"
        }`}
        onClick={() => rightArrowHandle()}
      >
        <ArrowRightIcon />
      </div>
      <div className="overflow-x-scroll md:overflow-x-hidden">
        <div
          style={{ marginLeft: scrollX }}
          className={`flex transition-all ease-in-out duration-500`}
        >
          {movies.length > 0 &&
            movies.map(
              (movie, index) =>
                ((isLargeRow && movie.poster_path) ||
                  (!isLargeRow && movie.backdrop_path)) && (
                  <Film
                    key={index}
                    movie={movie}
                    genres={genres}
                    isLargeRow={isLargeRow}
                  />
                )
            )}
        </div>
      </div>
    </div>
  );
}

export default Row;
