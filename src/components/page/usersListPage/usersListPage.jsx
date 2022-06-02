import React, { useEffect, useState } from "react";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import Pagination from "../../common/pagination";
import Search from "../../common/search";
import pictures from "../../../statics/images/images.png";
import api from "../../../api";
import _ from "lodash";
import { paginate } from "../../../utils/paginate";
import { useUser } from "../../../hooks/useUsers";

const UserListPage = () => {
    const { users } = useUser();
    const pageSize = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [searchQuery, setSearchQuery] = useState("");

    document.body.style.backgroundImage = `url(${pictures})`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundPosition = "center";

    const handleDelete = (userId) => {
        console.log(userId);
    };

    const handleToggleBookMark = (id) => {
        return users.map((colorIcon) => {
            if (colorIcon._id === id) {
                return { ...colorIcon, bookmark: !colorIcon.bookmark };
            }
            return colorIcon;
        });
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProfessionSelect = (item) => {
        if (searchQuery !== "") setSearchQuery("");
        setSelectedProf(item);
    };
    const handleSearchQuery = ({ target }) => {
        setSelectedProf(undefined);
        setSearchQuery(target.value);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        const filteredUsers = searchQuery
            ? users.filter(
                (user) =>
                    user.name.toLowerCase()
                        .indexOf(searchQuery.toLowerCase()) !== -1
            )
            : selectedProf
                ? users.filter((user) =>
                    _.isEqual(user.profession, selectedProf)
                )
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

        return <>
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
                <div className="d-flex flex-column w-100 pe-3">
                    <SearchStatus props={count}/>
                    <Search onChange={handleSearchQuery} value={searchQuery}/>
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
        </>;
    }
    return "loading...";
};

export default UserListPage;
