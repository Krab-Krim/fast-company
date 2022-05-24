import React from "react";
import PropTypes from "prop-types";
import BookMarkFalse from "../../statics/images/bookmark/1.svg";
import BookMarkTrue from "../../statics/images/bookmark/2.svg";

const BookMark = ({ status, ...rest }) => {
    const bookmarkStatus = () => {
        return status ? BookMarkTrue : BookMarkFalse;
    };

    const styleImg = {
        width: "30px"
    };

    return (
        <div {...rest}>
            <img src={bookmarkStatus()} alt="bookmar" style={styleImg}/>
        </div>
    );
};
BookMark.propTypes = {
    status: PropTypes.bool
};

export default BookMark;
