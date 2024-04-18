import React, { useState, useEffect, useContext, useRef } from "react";
import React, { useState, useEffect, useContext, useRef } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { AuthContext } from "../context/auth";
import { Grid, TextField, Button, Typography, Paper, Box, Avatar, Modal } from "@mui/material";
import { Grid, TextField, Button, Typography, Paper, Box, Avatar, Modal } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useNavigate } from 'react-router-dom';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';

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
const DELETE_CONVERSATION = gql`
  mutation deleteConversation($conversationId: ID!) {
    deleteConversation(conversationId: $conversationId) {
      id
      message
    }
  }
`;

function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const messagesEndRef = useRef(null);
  const [deleteConversationMutation] = useMutation(DELETE_CONVERSATION);

  const authToken = localStorage.getItem('jwtToken');

  useEffect(() => {
    const storedConversationId = localStorage.getItem('selectedConversationId');
    console.log("Stored Conversation ID: ", storedConversationId);
    if (storedConversationId) {
      const selected = conversations.find(conversation => conversation.id === storedConversationId);
      setSelectedConversation(selected);
    }
  }, [conversations]);
  useEffect(() => {
    const storedConversationId = localStorage.getItem('selectedConversationId');
    console.log("Stored Conversation ID: ", storedConversationId);
    if (storedConversationId) {
      const selected = conversations.find(conversation => conversation.id === storedConversationId);
      setSelectedConversation(selected);
    }
  }, [conversations]);

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
      console.log("Fetched Conversations", fetchedConversations);
      setConversations(fetchedConversations);
    }
  }, [conversationData]);

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation]);

  const [sendMessage] = useMutation(SEND_MESSAGE, {
   
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
      onCompleted: async () => {
        // Refetch conversations here if needed
        scrollToBottom();
      }
    },
  });

  const handleSelectConversation = (conversation) => {
    localStorage.setItem('selectedConversationId', conversation.id);
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
      window.location.reload();
      setMessage("");
      scrollToBottom(); // Scroll to bottom after sending message
    } catch (error) {
        console.log("JWTOKEN", localStorage.getItem('jwtToken'));
      console.error('Error sending message:', error);
      
    }
  };
  

  const handleDeleteConversation = async (conversationId) => {
    try {
      // Call the deleteConversation mutation
      const result = await deleteConversationMutation({
        variables: { conversationId },
      });

      // If the mutation is successful, remove the conversation from the state
      if (result.data.deleteConversation) {
        const { id, message } = result.data.deleteConversation;
        console.log(`Conversation with ID ${id} deleted: ${message}`);
        
        setConversations(prevConversations =>
          prevConversations.filter(conversation => conversation.id !== selectedConversation.id)
        );
        setSelectedConversation(null);
        localStorage.removeItem('selectedConversationId'); // Clear selected conversation from localStorage
      }
      // Close the modal after deletion
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDeleteConversation = async (conversationId) => {
    try {
      // Call the deleteConversation mutation
      const result = await deleteConversationMutation({
        variables: { conversationId },
      });

      // If the mutation is successful, remove the conversation from the state
      if (result.data.deleteConversation) {
        const { id, message } = result.data.deleteConversation;
        console.log(`Conversation with ID ${id} deleted: ${message}`);
        
        setConversations(prevConversations =>
          prevConversations.filter(conversation => conversation.id !== selectedConversation.id)
        );
        setSelectedConversation(null);
        localStorage.removeItem('selectedConversationId'); // Clear selected conversation from localStorage
      }
      // Close the modal after deletion
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDeleteConversation = async (conversationId) => {
    try {
      // Call the deleteConversation mutation
      const result = await deleteConversationMutation({
        variables: { conversationId },
      });

      // If the mutation is successful, remove the conversation from the state
      if (result.data.deleteConversation) {
        const { id, message } = result.data.deleteConversation;
        console.log(`Conversation with ID ${id} deleted: ${message}`);
        
        setConversations(prevConversations =>
          prevConversations.filter(conversation => conversation.id !== selectedConversation.id)
        );
        setSelectedConversation(null);
        localStorage.removeItem('selectedConversationId'); // Clear selected conversation from localStorage
      }
      // Close the modal after deletion
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
            elevation={selectedConversation === conversation ? 6 : 3}
            onClick={() => handleSelectConversation(conversation)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              backgroundColor: selectedConversation === conversation ? theme.palette.primary.main : 'white',
              color: selectedConversation === conversation ? 'white' : 'inherit',
              cursor: 'pointer',
              position: 'relative', // Add position relative
            }}
          >
            <div style={{ flex: 1 }}> {/* Container for conversation content */}
              <Avatar
                src={conversation ? (conversation.participants[1].id === user.id ? conversation.participants[0].image : conversation.participants[1].image) : ''}
                style={{ marginRight: '10px' }}
              />
              <Typography variant="h6">
                {conversation ? (conversation.participants[1].id === user.id ? conversation.participants[0].fullName : conversation.participants[1].fullName) : ''}
              </Typography>
            </div>
            {/* Conditionally render delete button  {selectedConversation === conversation && (
              <DeleteOutlineTwoToneIcon
                onMouseEnter={(e) => e.currentTarget.style.color = 'red'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent onClick on Paper from triggering
                  setShowModal(true);
                }}
                style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} // Position the icon
              />
            )}
            */}
          </Paper>
        ))}
      </Grid>

      <Grid item xs={7} style={{ border: "2px solid grey", height: "500px", overflowY: "auto" }}>
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
              <div ref={messagesEndRef} />
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

      {/* Modal for confirmation */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Deleting this will delete the chat permanently. Continue?
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            mt={2} // Add margin top for spacing
          >
            <Button variant="contained" color="primary"   onClick={() => {
    handleDeleteConversation(selectedConversation.id);
  }}
 >
              Confirm Delete
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Grid>
  );
}

const GET_CONVERSATIONS_QUERY = gql`
  {
    getConversations {
      id
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

export default Messages;
