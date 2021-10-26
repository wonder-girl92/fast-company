import React from 'react'
import Qualitie from './qualitie'
import Bookmark from './bookmark'

function User ({ users, onDelete, onToggleBookmark }) {
  return (
    <div>
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
          <tr key={user._id}>
            <td> {user.name} </td>
            <td>
              {user.qualities.map((item) => (
                <Qualitie
                  color={item.color}
                  name={item.name}
                  _id={item._id}
                />
              ))}
            </td>
            <td> {user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}</td>
            <td>
              <Bookmark
                status={user.bookmark}
                onClick={() => onToggleBookmark(user._id)}
              />
            </td>
            <td>
              <button
                className={'btn btn-danger btn-sm'}
                onClick={() => onDelete(user._id)}
              >
                Удалить
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default User