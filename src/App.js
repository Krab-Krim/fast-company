import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import NotFound from "./components/page/notFound";
import Users from "./layouts/users";
import AuthProvider from "./hooks/useAuth";
import AuthProviderLogIn from "./hooks/useAuthLogIn";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";

function App() {
    return (
        <div>
            <AppLoader>
                <AuthProvider>
                    <AuthProviderLogIn>
                        <NavBar/>
                        <Switch>
                            <ProtectedRoute
                                path="/users/:userId?/:edit?"
                                component={Users}
                            />
                            <Route path="/" exact exactly component={Main}/>
                            <Route path="/login/:type?" exactly component={Login}/>
                            <Route path="/logout" component={LogOut}/>
                            <Route path="/404" exactly component={NotFound}/>
                            <Redirect from="/admin" to="/"/>
                            <Redirect to="/404"/>
                        </Switch>
                    </AuthProviderLogIn>
                </AuthProvider>
            </AppLoader>
            <ToastContainer/>
        </div>
    );
}

export default App;
