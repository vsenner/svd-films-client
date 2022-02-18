import MainPage from "../components/MainPage/MainPage";
import GenrePage from "../components/GenrePage/GenrePage";
import MoviePage from "../components/MoviePage/MoviePage";
import UserPage from "../components/UserPage/UserPage";
import LoginPage from "../components/LoginPage/LoginPage";
import SignUpPage from "../components/SignUpPage/SignUpPage";
import React from "react";
import UserFavouritePage from "../components/UserFavouritePage/UserFavouritePage";
import UserRatedPage from "../components/UserRatedPage/UserRatedPage";
import UserLaterPage from "../components/UserLaterPage/UserLaterPage";
import TVPage from "../components/TVPage/TVPage";

const allAccessRoutes = [
  {path: '/' , component: <MainPage/>},
  {path: '/genres/:type/:sortMethod' , component: <GenrePage/>},
  {path: '/genres/search/:query/:sortMethod' , component: <GenrePage/>},
  {path: '/movie/:id' , component: <MoviePage/>},
  {path: '/tv/:id' , component: <TVPage/>},
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