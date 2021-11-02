import React, { useState } from "react";
import api from "./api";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";

function App(props) {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(
      users.filter((user) => {
        return user._id !== userId;
      })
    );
  };

  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return {
            ...user,
            bookmark: !user.bookmark
          };
        }
        return user;
      })
    );
  };

  return (
    <main>
      <SearchStatus length={users.length} />
      <Users
        users={users}
        onDelete={handleDelete}
        onToggleBookMark={handleToggleBookMark}
      />
    </main>
  );
}

export default App;
