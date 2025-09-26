/**
 * 정서적 위로 (M)
 */
import { useEffect, useState } from "react";
import { Typography, Grid } from "@mui/material";

import UXReview from "./UXReview";
import ChatbotMessage from "./ChatbotMessage";
import { botReplies, userText } from "../../constants/consolation";

const botText = "안녕하세요. 챗봇 M입니다. 무엇을 도와드릴까요?";
const botReply = botReplies[2].text;

const Emotion = () => {
  const [userTyping, setUserTyping] = useState(false);
  const [botReplied, setBotReplied] = useState(false);
  const [typed, setTyped] = useState("");
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [showSurvey, setShowSurvey] = useState(false); // 추가

  const fadeInStyle = {
    animation: "fadeIn 0.5s",
    "@keyframes fadeIn": {
      from: { opacity: 0, transform: "translateY(20px)" },
      to: { opacity: 1, transform: "translateY(0)" },
    },
  };

  // 최초 시작 시 챗봇 인사만 먼저 보이게
  useEffect(() => {
    setTimeout(() => {
      setUserTyping(true);
    }, 700);
  }, []);

  // 7초 후 사용자 메시지 타이핑 시작
  useEffect(() => {
    if (!userTyping) return;

    // 타이핑 효과
    if (typed.length < userText.length) {
      const timeout = setTimeout(() => {
        setTyped(userText.slice(0, typed.length + 1));
      }, 50);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      // 타이핑 끝나면 1초 후 봇 답변
      const timeout = setTimeout(() => {
        setBotReplied(true);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [typed, userTyping]);

  // 챗봇 답변이 다 뜬 뒤 설문 표시
  useEffect(() => {
    if (botReplied) {
      setTimeout(() => setShowSurvey(true), 1500); // 1초 후 설문 표시
    }
  }, [botReplied]);

  return (
    <Grid justifyContent="center" alignContent={"center"}>
      <Grid container direction="column" alignItems="center">
        <Typography gutterBottom className="title">
          정서적 챗봇
        </Typography>
        <Typography className="explanation">
          다음은 정서적 위로를 제공하는 챗봇과의 대화입니다.
          <br />
          <br />
          정서적 위로는 상대방의 감정을 <br />
          <b>공감하고 인정해 주는 것</b>에 초점을 맞춘 위로 방식입니다.
        </Typography>
        <ChatbotMessage
          botText={botText}
          userTyping={userTyping}
          typed={typed}
          botReply={botReply}
          botReplied={botReplied}
          fadeInStyle={fadeInStyle}
          // userColor, botColor 필요시 오버라이드
        />
        {showSurvey && (
          <UXReview answers={answers} setAnswers={setAnswers} page="M" />
        )}
      </Grid>
    </Grid>
  );
};

export default Emotion;
