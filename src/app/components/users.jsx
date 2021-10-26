import User from './user'

function Users ({ users, ...rest }) {
  return (
    <>
      {users.length > 0 && (
        <User
          users={users}
          {...rest}
        />
      )}
    </>
  )
}

export default Users