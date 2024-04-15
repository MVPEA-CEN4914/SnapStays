import React, { useState, useEffect, useContext } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { AuthContext } from "../context/auth";
import { Grid, TextField, Button, Typography, Paper, Box, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const SEND_MESSAGE = gql`
  mutation sendMessage(
    $message: String!,
    $receiverId: ID!
  ) {
    sendMessage(
      message: $message
      receiverId: $receiverId
    ){
      message
    }
  }
`;

function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState([]);
  const theme = useTheme();
  const { user } = useContext(AuthContext);

  const authToken = localStorage.getItem('jwtToken');

  const { loading: messageLoading, error: messageError, data: messageData } = useQuery(GET_MESSAGES_QUERY, {
    context: {
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : '',
      },
    },
  });

  const { loading: conversationLoading, error: conversationError, data: conversationData } = useQuery(GET_CONVERSATIONS_QUERY, {
    context: {
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : '',
      },
    },
  });

  useEffect(() => {
    if (conversationData) {
      const fetchedConversations = conversationData.getConversations;
      setConversations(fetchedConversations);
    }
  }, [conversationData]);

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    context: {
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : '',
      },
    },
  });

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    try {
      const receiverId = selectedConversation ? 
      (selectedConversation.participants[1].id === user.id ? selectedConversation.participants[0].id : selectedConversation.participants[1].id) :
      null;
    await sendMessage({ variables: { message, receiverId } });
      setMessage("");
      // Optionally, you can update the conversation data after sending the message
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} >
        <Typography
          variant="h3"
          style={{ paddingLeft: "100px", paddingTop: "20px" }}
        >
          Your Messages:
        </Typography>
      </Grid>
      <Grid item xs={5} style={{ border: "2px solid grey" }}>
        {conversations.map((conversation, index) => (
          <Paper
            key={index}
            elevation={3}
            onClick={() => handleSelectConversation(conversation)}
            style={{ display: 'flex', alignItems: 'center', padding: '10px' }}
          >
            <Avatar src={conversation ? 
    (conversation.participants[1].id === user.id ? conversation.participants[0].image : conversation.participants[1].image) : 
    ''}  style={{ marginRight: '10px' }} />
            <Typography variant="h6">{conversation ? 
    (conversation.participants[1].id === user.id ? conversation.participants[0].fullName : conversation.participants[1].fullName) : 
    ''}</Typography>
          </Paper>
        ))}
      </Grid>
      <Grid item xs={7} style={{ border: "2px solid grey" }}>
        {selectedConversation ? (
          <>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {selectedConversation.messages.map((message, index) => (
                <Paper
                  key={index}
                  style={{
                    maxWidth: "60%",
                    padding: "10px",
                    margin: "10px",
                    backgroundColor:
                      message.senderId.id === user.id ? "#d3d3d3" : theme.palette.primary.light,
                    alignSelf:
                      message.senderId.id === user.id ? "flex-end" : "flex-start",
                  }}
                >
                  <Typography variant="body1">{message.message}</Typography>
                </Paper>
              ))}
            </div>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <TextField
                variant="outlined"
                value={message}
                onChange={handleMessageChange}
                style={{ flexGrow: 1, marginRight: "10px" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSendMessage}
                style={{
                  marginLeft: "20px",
                  marginRight: "20px",
                  padding: "15px 30px",
                }}
              >
                Send
              </Button>
            </Box>
          </>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ height: '100%' }}
          >
            <Typography variant="h5">
              Please select a conversation to see messages.
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

const GET_CONVERSATIONS_QUERY = gql`
  {
    getConversations {
      participants {
        id
        fullName
        username
        image
      }
      messages {
        senderId {
          id
          fullName
          username
        }
        receiverId {
          id
          fullName
          username
        }
        message
      }
    }
  }
`;

const GET_MESSAGES_QUERY = gql`
  {
    getMessages {
      participants {
        id
        fullName
        username
      }
      messages {
        senderId {
          id
          fullName
          image
        }
        receiverId {
          id
          fullName
          image 
        }
        message
      }
    }
  }
`;

export default Messages;
