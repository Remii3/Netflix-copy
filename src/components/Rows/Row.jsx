import React, { useEffect, useState } from "react";

import axiosLoc from "../../request/axios";

import Film from "./Film";

import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/outline";
function Row({ title, fetchUrl, isLargeRow = false, genres }) {
  const [movies, setMovies] = useState([]);
  const [scrolledScreen, setScrolledScreen] = useState(0);
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

  if (movies && movies.length < 1) return <>Loading</>;

  const moveRight = () => {
    setScrolledScreen((prev) => (isLargeRow ? prev - 249 * 3 : prev - 282 * 3));
  };
  const moveLeft = () => {
    setScrolledScreen((prev) => (isLargeRow ? prev + 249 * 3 : prev + 282 * 3));
  };

  const pageCheck = isLargeRow
    ? 244 * movies.length - 1500
    : 267 * movies.length - 1500;
  console.log(
    scrolledScreen < 0 ? scrolledScreen.toString().slice(1) : scrolledScreen
  );
  console.log(pageCheck);
  return (
    <div className="ml-5 p-4 ">
      <h2 className="pb-3">{title}</h2>
      <div className="relative">
        {scrolledScreen < 0 && (
          <span
            onClick={moveLeft}
            className={
              "absolute top-0 -left-[36px] h-full w-20 z-20 bg-[rgb(37,37,37)] opacity-80 hover:opacity-100 hidden md:flex hover:from-[rgba(37,37,37,0.9)] transition-all duration-200 transform items-center justify-center cursor-pointer group"
            }
          >
            <ArrowRightIcon className="w-3/4 opacity-30 stroke-[rgba(241,241,241,1)] group-hover:opacity-90 transition-all duration-100 transform group-active:stroke-[rgba(241,241,241,0.5)]" />
          </span>
        )}
        <div
          id="test"
          style={{
            left: `${scrolledScreen}px`,
          }}
          className={`relative flex w-full overflow-x-scroll md:overflow-x-visible transition-all  duration-300 `}
        >
          {movies.map(
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
        {(scrolledScreen < 0
          ? scrolledScreen.toString().slice(1)
          : scrolledScreen) < pageCheck && (
          <span
            onClick={moveRight}
            className={
              "absolute top-0 -right-[20px] h-full w-20 z-10 bg-[rgb(37,37,37)] hidden md:flex opacity-80 hover:opacity-100 transition-all duration-200 transform items-center justify-center cursor-pointer group"
            }
          >
            <ArrowLeftIcon className="w-3/4 opacity-50 stroke-[rgba(241,241,241,1)] group-hover:opacity-90 transition-all duration-100 transform group-active:stroke-[rgba(241,241,241,0.5)]" />
          </span>
        )}
      </div>
    </div>
  );
}

export default Row;
