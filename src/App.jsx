import React, { useEffect } from "react";

import HomeScreen from "./components/HomeScreen";
import Account from "./components/Account/Account";

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Account/Login";

import { auth, onAuthStateChanged } from "./firebase";
import { useDispatch } from "react-redux";
import { userSliceActions } from "./features/userSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          userSliceActions.login({ uid: userAuth.uid, email: userAuth.email })
        );
      } else {
        dispatch(userSliceActions.logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className={" bg-[#111] overflow-hidden"}>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Navigate to={"/login"} replace />} />
      </Routes>
    </div>
  );
};

export default App;
