import React, { useEffect, useState } from "react";
import Users from "./components/users";
import api from "./api";

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter((el) => el._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((colorIcon) => {
                if (colorIcon._id === id) {
                    return { ...colorIcon, bookmark: !colorIcon.bookmark };
                } else {
                    return { ...colorIcon };
                }
            })
        );
    };

    return (
        <div>
            <Users
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookMark}
                users={users}
                {...users}
            />
        </div>
    );
}

export default App;
