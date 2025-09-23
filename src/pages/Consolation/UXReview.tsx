/**
 * 위로 유형에 대한 사용자 경험 (리커트 5점 척도)
 */
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Grid,
  Button,
  // TextField,
  Fade,
} from "@mui/material";
import React, { useRef, useState } from "react";
import {
  Friendness,
  Effectiveness,
  Continuance,
} from "../../constants/uxreview";

import { likertLabels5 } from "../../constants/attachment";
import { useNavigate } from "react-router-dom";
import { useConsolationStore } from "../../stores/consolationStore";
import { useAnswers } from "../../stores/useAnswer";
import ErrorIcon from "@mui/icons-material/Error";

const allQuestions = [
  { items: Friendness },
  { items: Effectiveness },
  { items: Continuance },
];

interface UXReviewProps {
  answers: { [key: string]: string };
  setAnswers: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  page: string;
}

const UXReview = ({ answers, setAnswers, page }: UXReviewProps) => {
  const navigate = useNavigate();
  const getNextRoutes = useConsolationStore((s) => s.getNextRoutes);
  const visit = useConsolationStore((s) => s.visit);
  const [sectionErrors, setSectionErrors] = useState<boolean>(false);
  const [show, setShow] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setShow(true), 300); // 0.3초 후 등장
    return () => clearTimeout(timer);
  }, []);

  const commentRef = useRef("");
  /**
   * 다음
   */
  const goRandomPage = async () => {
    const nextRoutes = getNextRoutes();

    if (Object.keys(answers).length !== 10) {
      setSectionErrors(true);
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });

    const answerArray = Object.entries(answers).map(([key, value]) => ({
      id: `${page}${key}`,
      answer: value,
    }));

    if (commentRef.current.trim()) {
      answerArray.push({ id: `${page}C1`, answer: commentRef.current });
    }
    useAnswers.getState().add(answerArray);
    // 다음 라우트 없으면 선호도 조사로 이동
    if (nextRoutes.length === 0) {
      navigate("/consolation/prefertype");
      return;
    }
    const route = nextRoutes[Math.floor(Math.random() * nextRoutes.length)];
    visit(route);
    navigate(route);
  };

  // 답변 변경
  const handleChange =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setAnswers((prev) => ({ ...prev, [id]: e.target.value }));
    };

  return (
    <Fade in={show} timeout={600}>
      <Grid>
        <Typography sx={{ fontSize: "20px", mb: 2, mt: 4 }}>
          챗봇 {page}에 대한 경험을 평가해주세요 😊
        </Typography>
        <Stack
          spacing={4}
          sx={{
            textAlign: "left",
            mt: 4,
            width: { xs: "100%", sm: "590px" }, // 모바일은 100%, PC는 650px
          }}
          alignItems="center"
        >
          {allQuestions.map((section, idx) => (
            <Grid container gap={4} key={idx}>
              {section.items.map((q) => (
                <Box
                  key={q.id}
                  className="question-box"
                  sx={{
                    p: { xs: 1, sm: 2 },
                    fontSize: { xs: "16px", sm: "20px" },
                  }}
                >
                  <Typography className="question" sx={{ mb: 2 }}>
                    {q.id + ". " + q.text}
                  </Typography>
                  <RadioGroup
                    row
                    value={answers[String(q.id)] || ""}
                    onChange={handleChange(q.id)}
                    sx={{ pl: 1 }}
                  >
                    {[1, 2, 3, 4, 5].map((score) => (
                      <FormControlLabel
                        sx={{ mb: { xs: 1, sm: 0 }, mr: { xs: 3, sm: 2 } }}
                        key={score}
                        value={String(score)}
                        control={
                          <Radio
                            sx={{
                              width: { xs: "22px", sm: "30px" },
                              height: { xs: "22px", sm: "32px" },
                            }}
                          />
                        }
                        label={
                          <Typography
                            sx={{
                              fontSize: { xs: "14px", sm: "16px" },
                              ml: { xs: 1, sm: 0 },
                            }}
                          >
                            {likertLabels5[score]}
                          </Typography>
                        }
                      />
                    ))}
                  </RadioGroup>
                </Box>
              ))}
            </Grid>
          ))}
        </Stack>

        {/* <TextField
          label="챗봇 유형에 대한 의견을 자유롭게 작성해주세요. (예: 좋았던 점, 아쉬웠던 점 등)"
          multiline
          rows={2}
          onChange={(e) => {
            commentRef.current = e.target.value;
          }}
          sx={{ mt: 4, width: "600px" }}
        /> */}
        {sectionErrors && (
          <Grid container alignItems="center" gap={1} sx={{ mt: 2 }}>
            <ErrorIcon sx={{ color: "red" }} />
            <Typography sx={{ color: "red" }}>
              모든 문항에 대한 답을 선택해 주세요!
            </Typography>
          </Grid>
        )}
        <Button
          variant="contained"
          sx={{ py: 1, px: 3, mt: 2 }}
          onClick={goRandomPage}
        >
          다음
        </Button>
      </Grid>
    </Fade>
  );
};

export default UXReview;
