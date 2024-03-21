import { useQuery, gql } from "@apollo/client";
import React, {useContext} from "react";
import { AuthContext } from '../context/auth';

function UserProfile() {
  const{user} = useContext(AuthContext);
  //console.log(user);
  //console.log(user.id);
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { userId: user.id }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const userData = data.getUser;
  return <div>
    <h1>Your Profile Information</h1>
    <p>Hi! {userData.fullName} </p>
  </div>;
}

const GET_USER_QUERY = gql`
  query GetUser($userId: ID!){
    getUser(userId:$userId) {
      id
      email
      fullName
    }
  }
`;

export default UserProfile;
