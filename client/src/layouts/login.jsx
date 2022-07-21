import React, { useState } from "react";
import LoginForm from "../components/ui/loginForm";
import { useParams } from "react-router-dom";
import RegisterForm from "../components/ui/registerForm";
import pictures from "../statics/images/images.png";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(type === "register" ? type : "login");

    const toggleFormType = () => {
        setFormType(prevState => prevState === "register" ? "login" : "register");
    };

    document.body.style.backgroundImage = `url(${pictures})`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundPosition = "center";

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        { formType === "register"
                            ? (<>
                                <h3 className="mb-4 text-center">Register</h3>
                                <RegisterForm/>
                                <p>
                                    Already have account? {" "}
                                    <a role="button" onClick={toggleFormType}>
                                        {" "}
                                        Sign In
                                    </a>
                                </p>
                            </>)
                            : (<>
                                <h3 className="mb-4 text-center">Login</h3>
                                <LoginForm/>
                                <p>
                                    Dont have account? {" "}
                                    <a role="button" onClick={toggleFormType}>
                                        {" "}
                                        Sign Up
                                    </a>
                                </p>
                            </>)
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
