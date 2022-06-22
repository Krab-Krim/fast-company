import React from "react";
import PropTypes from "prop-types";
import BookMark from "../common/bookmark";
import Table from "../common/table";
import Profession from "./profession";
import Qualities from "./qualities";

const UserTable = ({ user, onSort, selectedSort, ...props }) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя"
        },
        qualities: {
            name: "Качества",
            component: (user) => <Qualities qualities={user.qualities} />
        },
        professions: {
            name: "Профессия",
            component: (user) => <Profession id={user.profession}/>
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
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};

export default UserTable;
