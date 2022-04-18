import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import _ from "lodash";
import UserTable from "./usersTable";
import loaderImg from "../statics/images/loader.gif";
import pictures from "../statics/images/images.png";

const Users = () => {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
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
        }

        api.users.fetchAll().then((data) => {
            loader = false;

            if (!loader) {
                document.body.style.backgroundImage = `url(${pictures})`;
                h1.style.display = "block";
            }
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

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus props={count}/>
                {count > 0 && (
                    <UserTable
                        user={userCrop}
                        onDelete={handleDeleteUser}
                        onToggleBookMark={handleToggleBookMark}
                        onSort={handleSort}
                        selectedSort={sortBy}
                    />
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    props: PropTypes.object,
    onToggleBookMark: PropTypes.func,
    onDelete: PropTypes.func
};

export default Users;
