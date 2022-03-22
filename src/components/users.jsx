import React, {useState} from 'react';
import api from "../api";

const Users = () => {
    const [count, setCount] = useState(api.users.fetchAll().length);
    const [users, setUsers] = useState(api.users.fetchAll());

    const formatCount = () => {
        return count === 0 ? "Никто с тобой не тусанет" : count + ` ${renderPhrase()} с тобой сегодня`;
    };

    const getBadgeClasses = () => {
        let classes = "badge m-2 ";
        classes += count === 0 ? "bg-danger" : "bg-primary";
        return classes;
    };

    const getTableClasses = () => {
        return count === 0 ? "d-none" : "table table-hover";
    };

    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter(el => el._id !== userId));
        setCount(prevState => prevState - 1);
    };

    const renderPhrase = () => {
        if (count === 1 || count >= 5) {
            return 'человек тусанет';
        } else if (count >= 2 && count < 5) {
            return 'человека тусанут';
        }
    };

    const getListUsers = users.map((item, index) => {
        return <tr key={index}>
            <td>{item.name}</td>
            <td>
                {item.qualities.map(function (quality, i) {
                    let className = `badge bg-${quality.color} m-2`;
                    return <span
                        key={i}
                        className={className}
                    >
                        {quality.name}
                    </span>
                })}
            </td>
            <td>{item.profession.name}</td>
            <td>{item.completedMeetings}</td>
            <td>{item.rate}</td>
            <td>
                <button
                    type="button" className="btn btn-danger"
                    onClick={() => handleDelete(item._id)}
                    key={item._id}
                >
                    delete
                </button>
            </td>
        </tr>
    });

    return <>
        <h1>
            <span className={getBadgeClasses()}>
                {formatCount()}
            </span>
        </h1>
        <table className={getTableClasses()}>
            <thead>
            <tr className="table-dark">
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            {getListUsers}
            </tbody>
        </table>
    </>;
};

export default Users;