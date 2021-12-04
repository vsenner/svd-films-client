import MainPage from "../components/MainPage/MainPage";
import GenrePage from "../components/GenrePage/GenrePage";
import FilmPage from "../components/FilmPage/FilmPage";

export const privateRoutes = [

]

export const publicRoutes = [
  {path: '/' , exact: true , component: <MainPage/>},
  {path: '/genres/:type' , exact: true , component: <GenrePage/>},
  {path: '/genres/search/:query' , exact: true , component: <GenrePage/>},
  {path: '/film/:id' , exact: true , component: <FilmPage/>},
]