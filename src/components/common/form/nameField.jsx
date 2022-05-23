import React from "react";
import PropTypes from "prop-types";

const NameField = ({ value, label, name, onChange, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <input
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={getInputClasses()}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

NameField.propTypes = {
    editUserPage: PropTypes.object,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    name: PropTypes.string
};

export default NameField;
