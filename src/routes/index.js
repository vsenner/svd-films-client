import MainPage from "../components/MainPage/MainPage";
import GenrePage from "../components/GenrePage/GenrePage";
import FilmPage from "../components/FilmPage/FilmPage";
import UserPage from "../components/UserPage/UserPage";
import LoginPage from "../components/LoginPage/LoginPage";
import SignUpPage from "../components/SignUpPage/SignUpPage";
import React from "react";
import UserFavouritePage from "../components/UserFavouritePage/UserFavouritePage";
import UserRatedPage from "../components/UserRatedPage/UserRatedPage";
import UserLaterPage from "../components/UserLaterPage/UserLaterPage";

const allAccessRoutes = [
  {path: '/' , component: <MainPage/>},
  {path: '/genres/:type/:sortMethod' , component: <GenrePage/>},
  {path: '/genres/search/:query' , component: <GenrePage/>},
  {path: '/film/:id' , component: <FilmPage/>},
]

export const privateRoutes = [
  {path: '/user/:id' , component: <UserPage/>},
  {path: '/user/:id/favourites' , component: <UserFavouritePage/>},
  {path: '/user/:id/rated' , component: <UserRatedPage/>},
  {path: '/user/:id/later' , component: <UserLaterPage/>},
].concat(allAccessRoutes)

export const publicRoutes = [
  {path: '/login' , component:  <LoginPage/>},
  {path: '/signup' , component: <SignUpPage/>},
].concat(allAccessRoutes)