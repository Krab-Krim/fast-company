import React from "react";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import Pagination from "../../common/pagination";
import PropTypes from "prop-types";
import Search from "../../common/search";

const UserListPage = ({
    professions,
    selectedProf,
    onItemSelect,
    clearFilter,
    count,
    userCrop,
    onDelete,
    onToggleBookMark,
    handleSort,
    sortBy,
    pageSize,
    currentPage,
    onPageChange,
    setValue
}) => {
    return <>
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={onItemSelect}
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
                <Search setValue={setValue} clearFilter={clearFilter}/>
                {count > 0 && (
                    <UserTable
                        user={userCrop}
                        onDelete={onDelete}
                        onToggleBookMark={onToggleBookMark}
                        onSort={handleSort}
                        selectedSort={sortBy}
                    />
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>
        </div>
    </>;
};

UserListPage.propTypes = {
    onToggleBookMark: PropTypes.func,
    onDelete: PropTypes.func,
    onItemSelect: PropTypes.func,
    professions: PropTypes.object,
    selectedProf: PropTypes.object,
    clearFilter: PropTypes.func,
    count: PropTypes.number,
    userCrop: PropTypes.array,
    handleSort: PropTypes.func,
    sortBy: PropTypes.object,
    pageSize: PropTypes.number,
    currentPage: PropTypes.number,
    onPageChange: PropTypes.func,
    search: PropTypes.func,
    setValue: PropTypes.func
};

export default UserListPage;
