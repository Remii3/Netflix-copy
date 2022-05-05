import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectPlan } from "../features/subscriptionSlice";

import axiosLoc from "../request/axios";
import requests from "../request/requests";

import Banner from "./Header/Banner";
import Nav from "./Header/Nav";
import Row from "./Rows/Row";

const HomeScreen = () => {
  const [genres, setGenres] = useState([]);
  const [userVerified, setUserVerified] = useState(false);
  const subscribed = useSelector(selectPlan);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = window.localStorage.getItem("logIn");
    const subscription = window.localStorage.getItem("subscription");

    if (!loggedIn) {
      navigate("/login");
      return;
    } else if (!subscription) {
      navigate("/account");
      return;
    }

    setUserVerified(true);

    const fetchData = async () => {
      try {
        const genres = await axiosLoc.get(requests.fetchGenres);

        setGenres(genres.data.genres);

        return genres;
      } catch (err) {
        throw new Error(err);
      }
    };

    fetchData();
  }, [navigate, subscribed]);

  return (
    <>
      <Nav />
      {userVerified && (
        <>
          <Banner />
          <Row
            title="NETFLIX ORIGINALS"
            fetchUrl={requests.fetchNetflixOriginals}
            genres={genres}
            isLargeRow
          />
          <Row
            title="Trending Now"
            fetchUrl={requests.fetchTrending}
            genres={genres}
          />
          <Row
            title="Top Rated"
            fetchUrl={requests.fetchTopRated}
            genres={genres}
          />
          <Row
            title="Action Movies"
            fetchUrl={requests.fetchActionMovies}
            genres={genres}
          />
          <Row
            title="Comedy Movies"
            fetchUrl={requests.fetchComedyMovies}
            genres={genres}
          />
          <Row
            title="Horror Movies"
            fetchUrl={requests.fetchHorrorMovies}
            genres={genres}
          />
          <Row
            title="Romance Movies"
            fetchUrl={requests.fetchRomanceMovies}
            genres={genres}
          />
          <Row
            title="Documentaries"
            fetchUrl={requests.fetchDocumentaries}
            genres={genres}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
