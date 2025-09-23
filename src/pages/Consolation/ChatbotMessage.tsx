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
  isFirst?: boolean; // 첫 라우트 여부 prop 추가
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
      width: { xs: "100%", sm: 450 },
      mt: 2,
      border: "1px solid #ccc",
      borderRadius: 2,
      fontSize: { xs: "1rem", sm: "1.1rem" },
      p: { xs: 1, sm: 2 },
      maxWidth: { xs: "100vw", sm: 450 },
      boxSizing: "border-box",
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
        maxWidth: { xs: "95%", sm: "80%" },
        wordBreak: "break-word",
        ...fadeInStyle,
      }}
    >
      {botText}
    </Box>
    {/* 사용자 타이핑 효과: 첫 번째 라우트일 때만 */}
    {userTyping && (
      <Box
        sx={{
          alignSelf: "flex-end",
          bgcolor: userColor,
          color: "white",
          px: 2,
          py: 1,
          borderRadius: 2,
          maxWidth: { xs: "95%", sm: "80%" },
          fontFamily: "inherit",
          minHeight: "32px",
          letterSpacing: "0.5px",
          wordBreak: "break-word",
        }}
      >
        {typed}
        {/* <span style={{ opacity: 0.5 }}>|</span> */}
      </Box>
    )}
    {/* 챗봇 답변 */}
    {botReplied && botReply && (
      <Box
        sx={{
          bgcolor: botColor,
          color: "black",
          px: 2,
          py: 1,
          borderRadius: 2,
          maxWidth: { xs: "95%", sm: "85%" },
          wordBreak: "break-word",
          ...fadeInStyle,
          whiteSpace: "pre-line",
          textAlign: "left",
        }}
      >
        {botReply}
      </Box>
    )}
  </Stack>
);

export default ChatbotMessage;
