import React from 'react';
import {Route, Switch,Redirect} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../../Router/Router";

const Router = () => {
  const isAuth = false
  const routeList = isAuth ? privateRoutes : publicRoutes
  return (
    <Switch>
      {routeList.map(route =>
        <Route path={route.path} component={route.component} exact={route.exact} key={route.path}/>)
      }
      {isAuth
        ?<Redirect to={'/'}/>

      : <Redirect to={'/login'}/>
      }
    </Switch>
  );
};

export default Router;