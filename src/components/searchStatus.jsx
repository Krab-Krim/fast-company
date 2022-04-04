import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    const count = length.length;

    const formatCount = () => {
        return count === 0
            ? "Никто с тобой не тусанет"
            : count + ` ${renderPhrase()} с тобой сегодня`;
    };

    const getBadgeClasses = () => {
        let classes = "badge m-2 ";
        classes += count === 0 ? "bg-danger" : "bg-primary";
        return classes;
    };

    const renderPhrase = () => {
        if (count === 1 || count >= 5) {
            return "человек тусанет";
        } else if (count >= 2 && count < 5) {
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
    length: PropTypes.array.isRequired
};

export default SearchStatus;
