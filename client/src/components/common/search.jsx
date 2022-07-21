import React from "react";
import PropTypes from "prop-types";

const Search = ({ onChange, value }) => {
    return (
        <>
            <nav className="navbar navbar-light justify-content-center mb-3">
                <form className="form-inline d-flex btn-group w-50 input-group">
                    <input
                        className="form-control mr-sm-2 search"
                        type="text"
                        placeholder="Поиск по списку"
                        aria-label="Search"
                        onChange={onChange}
                        value={value}
                    />
                    <span className="input-group-text bg-light">
                        <i className="bi bi-search"></i>
                    </span>
                </form>
            </nav>
        </>
    );
};

Search.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string
};

export default Search;
