import React from "react";
import { useQuery, gql } from "@apollo/client";

function UserProfile() {
  const { loading, error, data } = useQuery(GET_USER_QUERY);
  return <div>UserProfile</div>;
}

const GET_USER_QUERY = gql`
  {
    getUsers {
      id
      email
      fullName
    }
  }
`;

export default UserProfile;
