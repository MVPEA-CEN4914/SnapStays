import React, { useState } from "react";
import { Grid, TextField, Button, Typography, Paper, Box , Avatar} from "@mui/material";
import { useTheme } from "@mui/material/styles";

function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState("");
  const theme = useTheme();

  const conversations = [
    // This is where you would fetch your list of conversations or users

    {
      name: "Conversation 1",
      photo: "url-to-photo-1",
      messages: [
        { sender: "you", text: "Hello!" },
        { sender: "them", text: "Hi, how are you?" },
        { sender: "you", text: "I'm good, thanks!" },
      ],
    },
    {
      name: "Conversation 2",
      photo: "url-to-photo-2",
      messages: [
        { sender: "them", text: "Hey!" },
        { sender: "you", text: "Hey, what's up?" },
      ],
    },
  ];

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    // Here you would send the message to your backend
    setMessage("");
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} >
        <Typography
          variant="h3"
          style={{ paddingLeft: "100px", paddingTop: "20px" }}
        >
          {" "}
          Your Messages:
        </Typography>
      </Grid>
      <Grid item xs={5} style={{ border: "2px solid grey" }}>
        {conversations.map((conversation) => (
          <Paper
            elevation={3}
            onClick={() => handleSelectConversation(conversation)}
            style={{ display: 'flex', alignItems: 'center', padding: '10px' }}
          >
            <Avatar src={conversation.photo} style={{ marginRight: '10px' }} />
            <Typography variant="h6">{conversation.name}</Typography>
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
                      message.sender === "you" ? "#d3d3d3" : theme.palette.primary.light,
                    alignSelf:
                      message.sender === "you" ? "flex-end" : "flex-start",
                  }}
                >
                  <Typography variant="body1">{message.text}</Typography>
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

export default Messages;
