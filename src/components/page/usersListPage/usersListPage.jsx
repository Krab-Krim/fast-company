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
    const [valueSearch, setValueSearch] = useState("");

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

    const clearFilter = () => {
        setSelectedProf();
    };

    const filteredCountries = users.filter((user) => {
        return user.name.toLowerCase().includes(valueSearch.toLowerCase());
    });

    const search = document.querySelector(".search");

    const filteredUsers = selectedProf
        ? filteredCountries.filter((user) => _.isEqual(user.profession, selectedProf))
        : filteredCountries;

    const count = filteredUsers.length;

    if (count === 0 && filteredCountries.length > 0 && selectedProf !== undefined && valueSearch.length > 0) {
        search.value = "";
        setValueSearch("");
    };

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    const userCrop = paginate(sortedUsers, currentPage, pageSize);

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
                <Search setValue={setValueSearch} clearFilter={clearFilter}/>
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
};

export default UserListPage;
