import React from 'react';

const Qualitie = ({color}) => {
    const getListUsersColor = color.qualities.map(colors => {

        const className = `badge bg-${colors.color} m-2`;
        return <span
            key={colors._id}
            className={className}
        >
            {colors.name}
        </span>
    })

    return <>
        {getListUsersColor}
    </>
};

export default Qualitie;