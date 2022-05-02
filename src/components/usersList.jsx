import React from "react";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import Pagination from "./pagination";
import PropTypes from "prop-types";

const UserList = ({ professions, selectedProf, handleProfessionSelect, clearFilter, count, userCrop, handleDeleteUser, handleToggleBookMark, handleSort, sortBy, pageSize, currentPage, handlePageChange }) => {
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
    </>;
};

export default UserList;

UserList.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    props: PropTypes.object,
    onToggleBookMark: PropTypes.func,
    onDelete: PropTypes.func,
    professions: PropTypes.array,
    selectedProf: PropTypes.object,
    handleProfessionSelect: PropTypes.func,
    clearFilter: PropTypes.func,
    count: PropTypes.number,
    userCrop: PropTypes.array,
    handleDeleteUser: PropTypes.func,
    handleToggleBookMark: PropTypes.func,
    handleSort: PropTypes.func,
    sortBy: PropTypes.object,
    pageSize: PropTypes.number,
    currentPage: PropTypes.number,
    handlePageChange: PropTypes.func,
    id: PropTypes.func
};
