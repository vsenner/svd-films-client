import React from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../../routes";
import {useSelector} from "react-redux";

const Router = () => {
  const isAuth = useSelector(state => state?.user.isAuth)
  const routeList = isAuth ? privateRoutes : publicRoutes

  return (
    <Routes>
      {routeList.map(route =>
        <Route
          path={route.path}
          element={route.component}
          key={route.path}/>)
      }
      <Route path={'*'} element={<Navigate to={isAuth ? '/' : '/login'}/>}/>
    </Routes>
  );
};

export default Router;