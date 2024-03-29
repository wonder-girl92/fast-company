import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";
import NavBar from "./components/ui/navBar";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";

function App() {
  return (
    <div>
      <NavBar/>
      <QualitiesProvider>
        <ProfessionProvider>
          <Switch>
            <Route
              path="/users/:userId?/:edit?"
              component={Users}
            />
            <Route path="/login/:type?" component={Login}/>
            <Route path="/" exact component={Main}/>
            <Redirect to="/"/>
          </Switch>
        </ProfessionProvider>
      </QualitiesProvider>

      <ToastContainer/>
    </div>
  );
}

export default App;
