import MainPage from "../components/MainPage/MainPage";
import GenrePage from "../components/GenrePage/GenrePage";
import FilmPage from "../components/FilmPage/FilmPage";
import UserPage from "../components/UserPage/UserPage";
import LoginPage from "../components/LoginPage/LoginPage";
import SignUpPage from "../components/SignUpPage/SignUpPage";
import React from "react";

export const privateRoutes = [

]

export const publicRoutes = [
  {path: '/' , component: <MainPage/>},
  {path: '/genres/:type' , component: <GenrePage/>},
  {path: '/genres/search/:query' , component: <GenrePage/>},
  {path: '/film/:id' , component: <FilmPage/>},
  {path: '/user/:id' , component: <UserPage/>},
  {path: '/login' , component:  <LoginPage/>},
  {path: '/signup' , component: <SignUpPage/>},
]