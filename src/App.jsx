import React, { useEffect, useState } from "react";
import Users from "./components/users";
import api from "./api";
import loaderImg from "./statics/images/loader.gif";
import pictures from "./statics/images/images.png";

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let loader = true;
        const h1 = document.querySelector("h1");

        if (loader === true) {
            document.body.style.backgroundImage = `url(${loaderImg})`;
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundPosition = "center";
            h1.style.display = "none";
        };

        api.users.fetchAll().then((data) => {
            loader = false;

            if (!loader) {
                document.body.style.backgroundImage = `url(${pictures})`;
                h1.style.display = "block";
            };
            setUsers(data);
        });
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
