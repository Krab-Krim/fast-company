import React from "react";
import Quality from "./quality";
import PropTypes from "prop-types";

const QualitiesList = ({ item }) => {
    return (
        <>
            <Quality color={item}/>
        </>
    );
};

QualitiesList.propTypes = {
    item: PropTypes.array
};

export default QualitiesList;
