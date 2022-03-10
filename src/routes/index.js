import MainPage from "../components/MainPage/MainPage";
import GenrePage from "../components/GenrePage/GenrePage";
import MoviePage from "../components/MoviePage/MoviePage";
import UserPage from "../components/UserPage/UserPage";
import LoginPage from "../components/LoginPage/LoginPage";
import SignUpPage from "../components/SignUpPage/SignUpPage";
import React from "react";
import TVPage from "../components/TVPage/TVPage";
import IndividualMediaPage from "../components/IndividualMediaPage/IndividualMediaPage";

const allAccessRoutes = [
  {path: '/' , component: <MainPage/>},
  {path: '/genres/:type/:sortMethod' , component: <GenrePage/>},
  {path: '/genres/search/:query' , component: <GenrePage/>},
  {path: '/movie/:id' , component: <MoviePage/>},
  {path: '/tv/:id' , component: <TVPage/>},
]

export const privateRoutes = [
  {path: '/user/:user_id' , component: <UserPage/>},
  {path: '/user/:user_id/:media_type/:type' , component: <IndividualMediaPage/>},
].concat(allAccessRoutes)

export const publicRoutes = [
  {path: '/login' , component:  <LoginPage/>},
  {path: '/signup' , component: <SignUpPage/>},
].concat(allAccessRoutes)