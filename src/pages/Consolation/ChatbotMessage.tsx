import { Box, Stack } from "@mui/material";
import React from "react";

interface ChatbotMessageProps {
  botText: string;
  userTyping: boolean;
  typed: string;
  botReply?: string;
  botReplied: boolean;
  fadeInStyle?: object;
  userColor?: string;
  botColor?: string;
}

const ChatbotMessage: React.FC<ChatbotMessageProps> = ({
  botText,
  userTyping,
  typed,
  botReply,
  botReplied,
  fadeInStyle = {},
  userColor = "primary.light",
  botColor = "grey.100",
}) => (
  <Stack
    spacing={2}
    sx={{
      width: 450,
      mt: 2,
      border: "1px solid #ccc",
      borderRadius: 2,
      fontSize: "1.1rem",
      p: 2,
    }}
  >
    {/* 챗봇 인사 */}
    <Box
      sx={{
        alignSelf: "flex-start",
        bgcolor: botColor,
        color: "black",
        px: 2,
        py: 1,
        borderRadius: 2,
        maxWidth: "80%",
        ...fadeInStyle,
      }}
    >
      {botText}
    </Box>
    {/* 사용자 타이핑 효과 */}
    {userTyping && (
      <Box
        sx={{
          alignSelf: "flex-end",
          bgcolor: userColor,
          color: "white",
          px: 2,
          py: 1,
          borderRadius: 2,
          maxWidth: "80%",
          fontFamily: "inherit",
          minHeight: "32px",
          letterSpacing: "0.5px",
        }}
      >
        {typed}
        <span style={{ opacity: 0.5 }}>|</span>
      </Box>
    )}
    {/* 챗봇 답변 */}
    {botReplied && botReply && (
      <Box
        sx={{
          alignSelf: "flex-start",
          bgcolor: botColor,
          color: "black",
          px: 2,
          py: 1,
          borderRadius: 2,
          maxWidth: "80%",
          ...fadeInStyle,
        }}
      >
        {botReply}
      </Box>
    )}
  </Stack>
);

export default ChatbotMessage;
