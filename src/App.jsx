import React, {useState} from 'react';
import Users from './components/users';
import SearchStatus from "./components/searchStatus";
import api from './api';


function App() {
    const [users, setUsers] = useState(api.users.fetchAll);

    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter(el => el._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        setUsers(users.map(colorIcon => {
            if (colorIcon._id === id) {
                return {...colorIcon, bookmark: !colorIcon.bookmark}
            } else {
                return {...colorIcon};
            }
        }))
    };

    return (
        <div>
            <SearchStatus length={users}/>
            <Users
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookMark}
                users={users}
                {...users}/>
        </div>
    );
};

export default App;