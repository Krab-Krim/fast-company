import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../hooks/useQualities";
import Qualities from "./qualities";

const Quality = ({ id }) => {
    const { isLoading, getQuality } = useQualities();
    const quality = getQuality(id);
    if (!isLoading) return <Qualities item={quality}/>;
    return "Loading...";
};
Quality.propTypes = {
    id: PropTypes.array
};
export default Quality;
