import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import NotFound from "./components/page/notFound";
import Users from "./layouts/users";
import EditUserPage from "./components/page/editUserPage";

function App() {
    return (
        <div>
            <NavBar/>
            <Switch>
                <Route path="/" exact exactly component={Main}/>
                <Route path="/login/:type?" exactly component={Login}/>
                <Route path="/users/:userId?/edit" exactly component={EditUserPage}/>
                <Route path="/users/:userId?" exactly component={Users}/>
                <Route path="/404" exactly component={NotFound}/>
                <Redirect from="/admin" to="/"/>
                <Redirect to="/404"/>
            </Switch>
        </div>
    );
}

export default App;
