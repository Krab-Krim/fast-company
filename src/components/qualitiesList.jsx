import React from "react";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";

const QualitiesList = ({ item }) => {
    return (
        <>
            <Qualitie color={item}/>
        </>
    );
};

QualitiesList.propTypes = {
    item: PropTypes.object
};

export default QualitiesList;
