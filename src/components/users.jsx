import React from "react";
import User from "./user";

const Users = ({users, ...props}) => {
    const count = users.length;

    const getTableClasses = () => {
        return count === 0 ? "d-none" : "table table-hover";
    };

    return (
        <>
            <table className={getTableClasses()}>
                <thead>
                <tr className="table-dark">
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col">Избранное</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <User
                    onToggleBookMark={props.onToggleBookMark}
                    onDelete={props.onDelete}
                    user={users}
                />
                </tbody>
            </table>
        </>
    );
};

export default Users;