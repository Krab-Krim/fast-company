import React from "react";
import PropTypes from "prop-types";
import BookMark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";

const UserTable = ({ user, onSort, selectedSort, ...props }) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя"
        },
        qualities: {
            path: "qualities",
            name: "Качества",
            component: (user) => <QualitiesList item={user}/>
        },
        professions: {
            path: "profession.name",
            name: "Профессия"
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: {
            path: "rate",
            name: "Оценка"
        },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <BookMark
                    onToggleBookMark={props.onToggleBookMark}
                    status={user}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => props.onDelete(user._id)}
                    key={user._id}
                >
                    Удалить
                </button>
            )
        }
    };

    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={user}
        />
    );
};

UserTable.propTypes = {
    user: PropTypes.array.isRequired,
    props: PropTypes.object,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};

export default UserTable;
