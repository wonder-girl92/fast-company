import React, { useState } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";

function Users({ users: allUsers, ...rest }) {
  const count = allUsers.length;
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const users = paginate(allUsers, currentPage, pageSize);

  return (
    <>
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
      <Pagination
        itemsCount={count}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </>
  );
}

Users.propTypes = {
  users: PropTypes.array
};

export default Users;
