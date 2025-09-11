/**
 * 정보적 위로 (I)
 */
import { useEffect, useState, useCallback } from "react";
import { Box, Typography, Button, Stack, Grid } from "@mui/material";
import { useConsolationStore } from "../../stores/consolationStore";
import { useNavigate } from "react-router-dom";
import UXReview from "./UXReview";
import { useAnswers } from "../../stores/useAnswer";

const botText = "안녕하세요. 챗봇 I입니다. 무엇을 도와드릴까요?";
const userText =
  "나 요즘 너무 바빠서 정신이 없어. 할 일도 많고 마음의 여유가 없어서 힘들어.";
const botReply =
  '마음이 바쁘고 할 일이 많을 때, 자신을 돌아보며 하루를 점검하는 시간을 갖거나 좋아하는 일에 몰입하는 것도 마음의 평온을 가져오는 데 도움이 됩니다. 감정을 억누르기보다는 솔직히 인정하고, 하루에 한 번이라도 자신에게 "괜찮다"라고 말해주는 것도 정서적 안정에 긍정적입니다.';

const Information = () => {
  const [userTyping, setUserTyping] = useState(false);
  const [botReplied, setBotReplied] = useState(false);
  const [typed, setTyped] = useState("");
  const navigate = useNavigate();
  const getNextRoutes = useConsolationStore((s) => s.getNextRoutes);
  const visit = useConsolationStore((s) => s.visit);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  // 다음
  const goRandomPage = useCallback(() => {
    const nextRoutes = getNextRoutes();

    const answerArray = Object.entries(answers).map(([key, value]) => ({
      id: `I${key}`,
      answer: value,
    }));
    useAnswers.getState().add(answerArray);

    if (nextRoutes.length === 0) {
      navigate("/epilogue");
      return;
    }
    const route = nextRoutes[Math.floor(Math.random() * nextRoutes.length)];
    visit(route);
    navigate(route);
  }, [answers, getNextRoutes, visit, navigate]);

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
    <Grid sx={{ width: 620 }} justifyContent="center" alignContent={"center"}>
      <Grid container direction="column" alignItems="center">
        <Typography gutterBottom className="title">
          정보적 챗봇
        </Typography>
        <Grid
          sx={{
            width: 400,
            p: 2,
            minHeight: 400,
            mb: 2,
            border: "1px solid #ccc",
            borderRadius: 2,
            fontSize: "1.1rem",
          }}
        >
          <Stack spacing={2}>
            <Box
              sx={{
                alignSelf: "flex-start",
                bgcolor: "grey.100",
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

            {/* 사용자 타이핑 효과만 보여줌 */}
            {userTyping && (
              <Box
                sx={{
                  alignSelf: "flex-end",
                  bgcolor: "primary.light",
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
            {/* 봇 답변 */}
            {botReplied && (
              <Box
                sx={{
                  alignSelf: "flex-start",
                  bgcolor: "grey.100",
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
        </Grid>
        <UXReview answers={answers} setAnswers={setAnswers} />
        <Button
          variant="contained"
          sx={{ py: 1, px: 3, mt: 2 }}
          onClick={() => {
            goRandomPage();
          }}
        >
          다음
        </Button>
      </Grid>
    </Grid>
  );
};

export default Information;
