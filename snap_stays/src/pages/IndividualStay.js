import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Grid, Card } from '@mui/material';
import StayCard from "../component/StayCard";
import TempListing from "../images/TempListing.jpg";
// import gql from 'graphql-tag'
console.log("hello");
function IndividualStay(props) {

    //const listingId = props.match.params.listingId;
    const { listingId } = useParams();
    // const {data:{getListing}} = useQuery(GET_LISTING_QUERY, {
    //     variables: {
    //        listingId
    //     }
    // });
    const { data, loading, error } = useQuery(GET_LISTING_QUERY, {
        variables: { listingId }
    });

    let listingMarkup;

if (loading) return <CircularProgress />; // Show loading state
if (error) return <p>Error</p>; // Show error state

if (data && data.getListing) {
    const { id, title, price, numberOfRoommates } = data.getListing;

    listingMarkup = (
        <div>UserProfile</div> // Assuming you replace this with your actual markup
    );
} else {
    listingMarkup = <p>Loading post...</p>;
}

return listingMarkup;

    // let listingMarkup;

    // if(!getListing){
    //     listingMarkup = <p>loading post...</p>;
    // }
    // else{
    //     const{id, title, price, numberOfRoommates} = getListing;
    //     // listingMarkup = (
    //     //     <Grid>
    //     //     <Grid.Column width={2}>
    //     //     <img src={TempListing}
    //     //       size="small"
    //     //       float="right"
    //     //     />
    //     //   </Grid.Column>
    //     //     </Grid>
    //     // )
        
    //     listingMarkup = (
    //         <div>UserProfile</div>
    //     );

    // }

    // console.log("here");
    
    // return listingMarkup;

    }
    // const { loading, error, data } = useQuery(GET_LISTING_QUERY);
    // if (loading) return "Loading...";
    // if (error) return `Error! ${error.message}`;
    // return (
    //   <div>
    //     <div style={{ paddingBottom: "15px" }}>
    //       Search bar content here with filtering stuff
    //     </div>
    //   </div>
    // );



  const GET_LISTING_QUERY = gql`
    query ($listingId:ID!){
        getListing(listingId: $listingId)
        {
            id
            title
            price
            numberOfRoommates
        }

    }

      
`;


export default IndividualStay;
