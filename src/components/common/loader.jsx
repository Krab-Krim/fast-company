import React from "react";
import loader from "../../statics/images/loader.gif";

const Loader = () => {
    document.body.style.backgroundImage = `url(${loader})`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundPosition = "center";

    return (
        <> </>
    );
};

export default Loader;
