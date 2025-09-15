import { useState } from "react";
import {
  Box,
  Typography,
  Radio,
  Button,
  Grid,
  Paper,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { attachmentQuestions, likertLabels } from "../constants/attachment";
import { useAnswers } from "../stores/useAnswer";

export default function AttachmentSurvey() {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setError(false); // 선택 시 에러 해제
  };

  // 다음
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.keys(answers).length !== attachmentQuestions.length) {
      setError(true);
      return;
    }

    const answerArray = Object.entries(answers).map(([key, value]) => ({
      id: key,
      answer: value,
    }));
    useAnswers.getState().add(answerArray);

    navigate("/consolation/prologue");
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" gutterBottom className="title">
        애착유형
      </Typography>
      <p className="explanation">
        다음은 귀하의 애착유형에 관한 문항입니다. <br />
        해당하는 항목을 선택해주시길 바랍니다.
      </p>

      {/* 카드형 질문 목록 */}
      {attachmentQuestions.map((q) => (
        <Paper
          key={q.id}
          elevation={2}
          className="question-box"
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 2,
            backgroundColor: "white",
            textAlign: "left",
          }}
        >
          <Typography className="question">
            {q.id}. {q.text}
          </Typography>

          <Grid
            container
            sx={{ mt: 3 }}
            alignItems="flex-end"
            justifyContent="center"
          >
            <Typography sx={{ mb: 1.25 }}>전혀 그렇지 않다</Typography>
            <RadioGroup
              row
              value={answers[q.id] || ""}
              onChange={(e) => handleChange(q.id, e.target.value)}
              sx={{ gap: 1, ml: 1, mr: 1 }}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((score) => (
                <FormControlLabel
                  key={score}
                  value={String(score)}
                  control={<Radio />}
                  sx={{ margin: 0 }}
                  label={
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: { xs: "12px", sm: "14px" },
                        }}
                      >
                        {score}
                      </Typography>
                    </Box>
                  }
                  labelPlacement="top"
                />
              ))}
            </RadioGroup>
            <Typography sx={{ mb: 1.25 }}>매우 그렇다</Typography>
          </Grid>
        </Paper>
      ))}

      {error && (
        <Typography sx={{ color: "red", mt: 0.5, mb: 2 }}>
          모든 문항에 응답해주세요!
        </Typography>
      )}

      <Grid>
        <Button
          variant="contained"
          sx={{ py: 1, px: 3, mr: "8px" }}
          onClick={() => navigate("/basic")}
        >
          이전
        </Button>
        <Button variant="contained" sx={{ py: 1, px: 3 }} onClick={handleNext}>
          다음
        </Button>
      </Grid>
    </Box>
  );
}
