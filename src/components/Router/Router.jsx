import React from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../../Router/Router";

const Router = () => {
  const isAuth = false
  const routeList = isAuth ? privateRoutes : publicRoutes
  return (
    <Routes>
      {routeList.map(route =>
        <Route
          path={route.path}
          element={route.component}
          exact={route.exact}
          key={route.path}/>)
      }
    {/*  {isAuth
        ?<Redirect to={'/'}/>

      : <Redirect to={'/login'}/>
      }*/}
    </Routes>
  );
};

export default Router;