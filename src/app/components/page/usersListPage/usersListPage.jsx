import React, { useState, useEffect } from "react";

import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import api from "../../../api";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import { useUser } from "../../../hooks/useUsers";

const UsersListPage = () => {
  const { users } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfession] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  // по умолчанию сортировка по имени и возрастанию
  const [searchQuery, setSearchQuery] = useState("");
  // для поиска
  const pageSize = 8;

  const handleDelete = (userId) => {
    // setUsers(
    //   users.filter((user) => return user._id !== userId;
    //   );
    console.log("delete user");
  };

  const handleToggleBookMark = (id) => {
    const newArray = users.map((user) => {
        if (user._id === id) {
          return {
            ...user,
            bookmark: !user.bookmark
          };
        }
        return user;
      });
    // setUsers(newArray)
    console.log(newArray);
  };

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data));
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchQuery]);
  // переключение на 1-ую страницу после выбора определенной профессии в
  // фильтре. Следим также и за поисковыми данными

  const handleProfessionSelect = (item) => {
    if (searchQuery !== "") setSearchQuery("");
    // при выборе профессии очищаем поиск
    setSelectedProf(item);
  };
  const handleSearchQuery = ({ target }) => {
    setSelectedProf(undefined); // сброс текущей фильтрации по профессии
    setSearchQuery(target.value);
  };
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const handleSort = (item) => {
    setSortBy(item);
  };
  // при повторном нажатии на колонку (имя, профессия..) направление меняется
  // на обратное и при выборе другой колонки - направление меняется на стандартное
  // и также меняется параметр сортировки

    const filteredUsers = searchQuery
      ? users.filter((user) =>
        user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
    // приоритетен поиск перед фильтрацией
      : selectedProf
        ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf))
      // т.к.первый является объектом, второй массивом, приводим к одному
      // типу их значения - строке
        : users;
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);
    // ф-я разбивки данных по страницам
    const clearFilter = () => {
      setSelectedProf();
    };

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column
          flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProfessionSelect}
              valueProperty="_id"
              contentProperty="name"
            />
            <button
              className="btn btn-secondary mt-2"
              onClick={clearFilter}
            >
              {" "}
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={count}/>
          <input
            type="text"
            name="searchQuery"
            placeholder="Search..."
            onChange={handleSearchQuery}
            value={searchQuery}
          />
          {count > 0 && (
          <UserTable
              users={usersCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  };

UsersListPage.propTypes = {
  users: PropTypes.array
};

export default UsersListPage;
