import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useAuth } from "../authentication/context/AuthProvider";
import { LoginView } from "./../authentication/views/LoginView";
import { RegisterView } from "./../authentication/views/RegisterView";
import { Routes } from "./routes";
import { RestrictedRoute } from "./RestrictedRoute";

export const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Router>
      <Switch>
        <Route path={Routes.LOGIN}>
          {!isAuthenticated ? <LoginView /> : <Redirect to={Routes.HOME} />}
        </Route>
        <Route path={Routes.REGISTER}>
          {!isAuthenticated ? <RegisterView /> : <Redirect to={Routes.HOME} />}
        </Route>
      </Switch>
    </Router>
  );
};
