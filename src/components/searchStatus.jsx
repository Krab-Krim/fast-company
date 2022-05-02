import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ props }) => {
    const formatCount = () => {
        return !props
            ? "Никто с тобой не тусанет"
            : props + ` ${renderPhrase()} с тобой сегодня`;
    };

    const getBadgeClasses = () => {
        let classes = "badge my-3 d-flex justify-content-center ";
        classes += !props ? "bg-danger" : "bg-success";
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
