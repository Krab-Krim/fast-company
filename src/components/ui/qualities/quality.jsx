import React from "react";
import PropTypes from "prop-types";

const Quality = ({ color }) => {
    const getListUsersColor = color.map((colors) => {
        const className = `badge bg-${colors.color} m-2`;
        return (
            <span key={colors._id} className={className}>
                {colors.name}
            </span>
        );
    });

    return <>{getListUsersColor}</>;
};

Quality.propTypes = {
    color: PropTypes.array.isRequired
};

export default Quality;
