import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import api from "../api";
import _ from "lodash";
import pictures from "../statics/images/images.png";
import UserPage from "../components/userPage";
import UserList from "../components/usersList";
import { useParams } from "react-router-dom";
import Loader from "../components/loader";

const Users = () => {
    const pageSize = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [users, setUsers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const params = useParams();
    const { userId } = params;
    document.body.style.backgroundImage = `url(${pictures})`;

    useEffect(() => {
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundPosition = "center";
        api.users.fetchAll().then((data) => {
            setIsLoaded(true);
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

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = item => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const filteredUsers = selectedProf
        ? users.filter((user) => _.isEqual(user.profession, selectedProf))
        : users;

    const count = filteredUsers.length;

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    const clearFilter = () => {
        setSelectedProf();
    };

    const handleDeleteUser = (userId) => {
        handleDelete(userId);
        const pageCountUser = Math.ceil(count / pageSize);

        if (count % 2 !== 0 && currentPage === pageCountUser) setCurrentPage(pageCountUser - 1);
        if (count - 1 === 0) clearFilter();
    };

    const component = () => {
        return userId
            ? <UserPage userListId={userId} />
            : <UserList professions={professions} selectedProf={selectedProf} handleProfessionSelect={handleProfessionSelect} clearFilter={clearFilter} count={count} userCrop={userCrop} handleDeleteUser={handleDeleteUser} handleToggleBookMark={handleToggleBookMark} handleSort={handleSort} sortBy={sortBy} pageSize={pageSize} currentPage={currentPage} handlePageChange={handlePageChange}/>;
    };

    return (
        <>
            { isLoaded
                ? component()
                : <Loader/>
            }
        </>
    );
};

Users.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    props: PropTypes.object,
    onToggleBookMark: PropTypes.func,
    onDelete: PropTypes.func
};

export default Users;
