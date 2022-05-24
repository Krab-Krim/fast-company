import React from "react";
import pictures from "../statics/images/images.png";

const Main = () => {
    document.body.style.backgroundImage = `url(${pictures})`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundPosition = "center";
    return <h1> Main Page</h1>;
};

export default Main;
