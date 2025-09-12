/**
 * 정보적 위로 (I)
 */
import { useEffect, useState } from "react";
import { Typography, Grid } from "@mui/material";

import UXReview from "./UXReview";

import ChatbotMessage from "./ChatbotMessage";

const botText = "안녕하세요. 챗봇 I입니다. 무엇을 도와드릴까요?";
const userText =
  "나 요즘 너무 바빠서 정신이 없어. 할 일도 많고 마음의 여유가 없어서 힘들어.";
const botReply =
  '마음이 바쁘고 할 일이 많을 때, 자신을 돌아보며 하루를 점검하는 시간을 갖거나 좋아하는 일에 몰입하는 것도 마음의 평온을 가져오는 데 도움이 됩니다. 감정을 억누르기보다는 솔직히 인정하고, 하루에 한 번이라도 자신에게 "괜찮다"라고 말해주는 것도 정서적 안정에 긍정적입니다.';

const Information = () => {
  const [userTyping, setUserTyping] = useState(false);
  const [botReplied, setBotReplied] = useState(false);
  const [typed, setTyped] = useState("");

  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  // 페이드인 애니메이션 스타일
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

  return (
    <Grid justifyContent="center" alignContent={"center"}>
      <Grid container direction="column" alignItems="center">
        <Typography gutterBottom className="title">
          정보적 챗봇
        </Typography>
        <Typography className="explanation" sx={{ mb: 1 }}>
          다음은 정보적 위로를 제공하는 챗봇과의 대화입니다.
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
        <UXReview answers={answers} setAnswers={setAnswers} page="I" />
      </Grid>
    </Grid>
  );
};

export default Information;
