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
  TextField,
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
    console.log(useAnswers.getState().items);

    if (nextRoutes.length === 0) {
      navigate("/chatbot");
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
    <Grid>
      <Stack spacing={4} sx={{ textAlign: "left", mt: 4, width: "650px" }}>
        {allQuestions.map((section, idx) => (
          <Grid container gap={4} key={idx} className="question">
            {section.items.map((q) => (
              <Box key={q.id}>
                <Typography sx={{ fontSize: "20px", mb: 1 }}>
                  {q.id + ". " + q.text}
                </Typography>
                <RadioGroup
                  row
                  value={answers[String(q.id)] || ""}
                  onChange={handleChange(q.id)}
                >
                  {[1, 2, 3, 4, 5].map((score) => (
                    <FormControlLabel
                      key={score}
                      value={String(score)}
                      control={<Radio />}
                      label={likertLabels5[score]}
                    />
                  ))}
                </RadioGroup>
              </Box>
            ))}
          </Grid>
        ))}
      </Stack>
      {/* 주관식 입력 칸 */}
      <TextField
        label="챗봇 유형에 대한 의견을 자유롭게 작성해주세요. (예: 좋았던 점, 아쉬웠던 점 등)"
        multiline
        rows={2}
        fullWidth
        onChange={(e) => {
          commentRef.current = e.target.value; // 🔑 state 대신 ref에 저장
        }}
        sx={{ mt: 4 }}
      />
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
        onClick={() => {
          goRandomPage();
        }}
      >
        다음
      </Button>
    </Grid>
  );
};

export default UXReview;
