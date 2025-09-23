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
      width: "100%",
      mt: 2,
      border: "1px solid #ccc",
      borderRadius: 2,
      fontSize: { xs: "0.9rem", sm: "1.1rem" }, // 모바일에서 글자 크기 축소
      p: { xs: 1, sm: 2 },
      maxWidth: { xs: "90%", sm: 450 }, // 모바일에서 전체 너비 사용
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
        maxWidth: { xs: "90%", sm: "80%" }, // 모바일에서 너비 조정
        wordBreak: "break-word",
        fontSize: { xs: "0.85rem", sm: "1rem" }, // 모바일에서 글자 크기 축소
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
          maxWidth: { xs: "80%", sm: "70%" }, // 모바일에서 너비를 더 줄임
          fontFamily: "inherit",
          minHeight: "32px",
          letterSpacing: "0.5px",
          wordBreak: "break-word",
          fontSize: { xs: "0.85rem", sm: "1rem" }, // 모바일에서 글자 크기 축소
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
          fontSize: { xs: "0.85rem", sm: "1rem" }, // 모바일에서 글자 크기 축소
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
