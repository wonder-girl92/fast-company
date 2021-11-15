import React, { useState, useEffect } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";

function Users({ users: allUsers, ...rest }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfession] = useState();
  const [selectedProf, setSelectedProf] = useState();

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data));
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);
  // переключение на 1-ую страницу после выбора определенной профессии в фильтре

  const pageSize = 2;

  const handleProfessionSelect = item => {
    setSelectedProf(item);
  };
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const filteredUsers = selectedProf
    ? allUsers.filter(
      (user) =>
        JSON.stringify(user.profession) === JSON.stringify(selectedProf))
    // т.к.первый является объектом, второй массивом, приводим к одному
    // типу их значения - строке
    : allUsers;
  const count = filteredUsers.length;
  const users = paginate(filteredUsers, currentPage, pageSize);
  // ф-я разбивки данных по страницам
  const clearFilter = () => {
    setSelectedProf();
  };

  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            selectedItem={selectedProf}
            items={professions}
            onItemSelect={handleProfessionSelect}
            valueProperty="_id"
            contentProperty="name"
          />
          <button className="btn btn-secondary mt-2"
            onClick={clearFilter}>
Очистить
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <SearchStatus length={count} />
        {count > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th scope="col">Избранное</th>
                <th scope="col">Удалить</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <User key={user._id} {...user} {...rest} />
              ))}
            </tbody>
          </table>

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
}

Users.propTypes = {
  users: PropTypes.array
};

export default Users;
