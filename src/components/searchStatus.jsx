import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ props }) => {
    const formatCount = () => {
        return props === 0
            ? "Никто с тобой не тусанет"
            : props + ` ${renderPhrase()} с тобой сегодня`;
    };

    const getBadgeClasses = () => {
        let classes = "badge m-2 ";
        classes += props === 0 ? "bg-danger" : "bg-primary";
        return classes;
    };

    const renderPhrase = () => {
        if (props === 1 || props >= 5) {
            return "человек тусанет";
        } else if (props >= 2 && props < 5) {
            return "человека тусанут";
        }
    };

    return (
        <>
            <h1>
                <span className={getBadgeClasses()}>{formatCount()}</span>
            </h1>
        </>
    );
};

SearchStatus.propTypes = {
    props: PropTypes.number
};

export default SearchStatus;
