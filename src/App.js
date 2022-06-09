import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import NotFound from "./components/page/notFound";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";
import Users from "./layouts/users";
import AuthProvider from "./hooks/useAuth";
import AuthProviderLogIn from "./hooks/useAuthLogIn";

function App() {
    return (
        <div>
            <AuthProvider>
                <AuthProviderLogIn>
                    <NavBar/>
                    <ProfessionProvider>
                        <QualitiesProvider>
                            <Switch>
                                <Route path="/" exact exactly component={Main}/>
                                <Route path="/login/:type?" exactly component={Login}/>
                                <Route path="/users/:userId?/:edit?" component={Users} />
                                <Route path="/404" exactly component={NotFound}/>
                                <Redirect from="/admin" to="/"/>
                                <Redirect to="/404"/>
                            </Switch>
                        </QualitiesProvider>
                    </ProfessionProvider>
                </AuthProviderLogIn>
            </AuthProvider>
            <ToastContainer/>
        </div>
    );
}

export default App;
