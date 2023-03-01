import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_USERS = gql`
  query {
    users {
      id
      name
      email
      age
    }
  }
`;

const Users = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <ul>
      {data.users.map((user) => (
        <li key={user.id}>
          {user.name}, {user.email}, {user.age}
        </li>
      ))}
    </ul>
  );
};

export default Users;
