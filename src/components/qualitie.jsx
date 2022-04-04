import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ color }) => {
    const getListUsersColor = color.qualities.map((colors) => {
        const className = `badge bg-${colors.color} m-2`;
        return (
            <span key={colors._id} className={className}>
                {colors.name}
            </span>
        );
    });

    return <>{getListUsersColor}</>;
};

Qualitie.propTypes = {
    color: PropTypes.object.isRequired
};

export default Qualitie;
