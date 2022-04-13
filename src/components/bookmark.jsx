import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, ...props }) => {
    return (
        <>
            <i className={"bi bi-bookmark" + (status.bookmark ? "-fill" : "")} onClick={() => props.onToggleBookMark(status._id)}></i>
        </>
    );
};

BookMark.propTypes = {
    status: PropTypes.object.isRequired,
    props: PropTypes.array,
    onToggleBookMark: PropTypes.func.isRequired
};

export default BookMark;
