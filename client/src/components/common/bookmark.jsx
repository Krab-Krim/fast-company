import React from "react";
import PropTypes from "prop-types";
import BookMarkFalse from "../../statics/images/bookmark/1.svg";
import BookMarkTrue from "../../statics/images/bookmark/2.svg";

const BookMark = ({ status, ...props }) => {
    const bookmarkStatus = () => {
        return status.bookmark ? BookMarkTrue : BookMarkFalse;
    };

    const styleImg = {
        width: "30px"
    };

    return (
        <img src={bookmarkStatus()} onClick={() => props.onToggleBookMark(status._id)} alt="bookmar" style={styleImg}/>
    );
};

BookMark.propTypes = {
    status: PropTypes.object.isRequired,
    props: PropTypes.array,
    onToggleBookMark: PropTypes.func.isRequired
};

export default BookMark;
