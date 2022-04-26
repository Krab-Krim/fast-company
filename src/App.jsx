import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import NotFound from "./components/notFound";
import Users from "./layouts/users";

function App() {
    return (
        <div>
            <NavBar/>
            <Switch>
                <Route path="/" exact component={Main}/>
                <Route path="/login" component={Login}/>
                <Route path="/users/:userId?" component={Users}/>
                <Route path="/404" component={NotFound}/>
                <Redirect from="/admin" to="/"/>
                <Redirect to="/404"/>
            </Switch>
        </div>
    );
}

export default App;
