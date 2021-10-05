import React, { useState } from 'react'
import api from '../api'

function Users () {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (userId) => {
    setUsers(
      users.filter((user) => {
        return user._id !== userId
      })
    )
  }
  const renderPhrase = (number) => {
    return (
      (number === 4 || number === 3 || number === 2)
        ?
        `${number} человека тусанут с тобой сегодня`
        :
        `${number} человек тусанет с тобой сегодня`)
  }

  const onHidden = () => {
    return users.length === 0 ? 'none' : ''
  }

  const noOne = () => {
    return (
      users.length === 0 ? 'Никто с тобой не тусанет'
        :
        renderPhrase(users.length)
    )
  }

  const changeClasses = () => {
    let classes = 'badge mb-3 mt-2 bg-'
    classes += users.length === 0 ? 'danger' : 'primary'
    return classes
  }

  let spanStyles = {
    fontSize: '25px',
  }

  return (<>
    <span style={spanStyles} className={changeClasses()}>
      {noOne()}
      </span>
    <table className="table">
      <thead style={{ display: onHidden() }}>
      <tr>
        <th scope="col">Имя</th>
        <th scope="col">Качества</th>
        <th scope="col">Профессия</th>
        <th scope="col">Встретился, раз</th>
        <th scope="col">Оценка</th>
        <th scope="col">Удалить</th>
      </tr>
      </thead>
      <tbody>
      {users.map((user) => {
        return (
          <tr key={user._id}>
            <td style={{ fontSize: '20px' }}> {user.name} </td>
            <td>
              {user.qualities.map((quality) => {
                return (
                  <span style={{ fontSize: '16px' }}
                        className={`badge bg-${quality.color} m-1`}
                        key={quality._id}>
                    {quality.name}
                  </span>
                )
              })}
            </td>
            <td>
              {user.profession.name}
            </td>
            <td>
              {user.completedMeetings}
            </td>
            <td>
              {user.rate}
            </td>
            <td>
              <button className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user._id)}>
                delete
              </button>
            </td>
          </tr>
        )
      })}
      </tbody>
    </table>
  </>)
}

export default Users