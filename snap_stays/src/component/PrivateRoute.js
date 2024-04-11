import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import { AuthContext } from "../context/auth";

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  const currentUserId = user ? user.id : null; // handle case where user is null
  const { data: userData } = useQuery(GET_USER_QUERY, {
    variables: { userId: currentUserId },
    skip: !currentUserId, //skip query if user is not logged in
  });

  return user && userData && userData.getUser && userData.getUser.verified ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

const GET_USER_QUERY = gql`
  query GetUser($userId: ID!) {
    getUser(userId: $userId) {
      id
      email
      verified
    }
  }
`;

export default PrivateRoute;
