import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import NotFound from "./components/page/notFound";
import { ProfessionProvider } from "./hooks/useProfession";
import Users from "./layouts/users";
import AuthProvider from "./hooks/useAuth";
import AuthProviderLogIn from "./hooks/useAuthLogIn";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);
    return (
        <div>
            <AuthProvider>
                <AuthProviderLogIn>
                    <NavBar/>

                        <ProfessionProvider>
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
                        </ProfessionProvider>

                </AuthProviderLogIn>
            </AuthProvider>
            <ToastContainer/>
        </div>
    );
}

export default App;
