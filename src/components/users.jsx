import React, { useState } from 'react'
import api from '../api'

function Users (props) {
  const [users, setUsers] = useState(api.users.fetchAll())

  // let counterClasses = 'badge bg-'

  let spanStyles = {
    fontSize: '25px',
    }

  return (<>
    <span style={spanStyles} className="badge bg-primary mb-3 mt-2">
      тусанет с тобой сегодня
    </span>
    <table className="table">
      <thead>
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
      <tr>
        {users.map((user) => {
          return (
            <td key={user._id}>
              {user.name}
            </td>
          )
        })}
        {/*{users.map((user) => {*/}
        {/*  return (*/}
        {/*    <td key={user._id}>*/}
        {/*      {user.qualities.map((qual)=>{*/}
        {/*        return <td key={qual._id}> {qual} </td>*/}
        {/*      })}*/}
        {/*    </td>*/}
        {/*  )*/}
        {/*})}*/}
        <td></td>
        <td></td>
        <td>
          <button className="btn btn-danger btn-sm">
            delete
          </button>
        </td>
      </tr>


      </tbody>
    </table>

  </>)
}

export default Users