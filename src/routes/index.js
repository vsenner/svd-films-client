import MainPage from "../components/MainPage/MainPage";
import GenrePage from "../components/GenrePage/GenrePage";
import MoviePage from "../components/MoviePage/MoviePage";
import UserPage from "../components/UserPage/UserPage";
import SignUpPage from "../components/SignUpPage/SignUpPage";
import React from "react";
import TVPage from "../components/TVPage/TVPage";
import IndividualMediaPage from "../components/IndividualMediaPage/IndividualMediaPage";
import SignInPage from "../components/SignInPage/SignInPage";

const allAccessRoutes = [
  {path: '/' , component: <MainPage/>},
  {path: '/genres/:media_type/:sort_method' , component: <GenrePage/>},
  {path: '/genres/search/:query/:sort_method' , component: <GenrePage/>},
  {path: '/movie/:id/:page' , component: <MoviePage/>},
  {path: '/tv/:id/:page' , component: <TVPage/>},
]

export const privateRoutes = [
  {path: '/user/:user_id' , component: <UserPage/>},
  {path: '/user/:user_id/:media_type/:type' , component: <IndividualMediaPage/>},
].concat(allAccessRoutes)

export const publicRoutes = [
  {path: '/login' , component:  <SignInPage/>},
  {path: '/signup' , component: <SignUpPage/>},
].concat(allAccessRoutes)