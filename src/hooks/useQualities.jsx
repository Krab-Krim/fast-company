import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import qualityService from "../services/quality.service";
import PropTypes from "prop-types";

const QualitiesContex = React.createContext();

export const useQualities = () => {
    return useContext(QualitiesContex);
};

export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const getQualities = async () => {
            try {
                const { content } = await qualityService.fetchAll();
                setQualities(content);
                setLoading(false);
            } catch (error) {
                errorCatcher(error);
            }
        };
        getQualities();
    }, []);

    const getQuality = (id) => {
        return qualities.filter(n => {
            return id.includes(n._id);
        });
    };

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    return (
        <QualitiesContex.Provider
            value={{
                qualities,
                isLoading,
                getQuality
            }}
        >
            {children}
        </QualitiesContex.Provider>
    );
};

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
