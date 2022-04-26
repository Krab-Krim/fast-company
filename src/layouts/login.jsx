import React from "react";
import pictures from "../statics/images/images.png";

const Login = () => {
    document.body.style.backgroundImage = `url(${pictures})`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundPosition = "center";
    return (
        <h2>Login</h2>
    );
};

export default Login;
