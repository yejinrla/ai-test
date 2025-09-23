import { useState } from "react";
import {
  Box,
  Typography,
  Radio,
  Button,
  Grid,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { attachmentQuestions } from "../constants/attachment";
import { useAnswers } from "../stores/useAnswer";
import ErrorIcon from "@mui/icons-material/Error";

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
      <Typography className="explanation" sx={{ mb: 4 }}>
        다음은 귀하의 애착유형에 관한 문항입니다. <br />
        주변 사람들과의 관계에서 자신을 가장 잘 나타내는 항목을 선택해주시길
        바랍니다.
      </Typography>

      {/* 카드형 질문 목록 */}
      {attachmentQuestions.map((q) => (
        <Grid
          key={q.id}
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
            sx={{
              mt: 3,
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "stretch", sm: "flex-end" },
            }}
          >
            {/* 왼쪽 라벨 */}
            <Typography
              sx={{
                mb: { xs: 1, sm: 1.25 },
                mr: { xs: 0, sm: 2 },
                textAlign: { xs: "left", sm: "center" },
                width: { xs: "100%", sm: "auto" },
                minWidth: { sm: 110 },
              }}
            >
              전혀 그렇지 않다
            </Typography>
            {/* 라디오 버튼 그룹 */}
            <RadioGroup
              row
              value={answers[q.id] || ""}
              onChange={(e) => handleChange(q.id, e.target.value)}
              sx={{
                flex: 1,
                gap: 1,
                ml: { xs: 0, sm: 1 },
                mr: { xs: 0, sm: 1 },
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((score) => (
                <FormControlLabel
                  key={score}
                  value={String(score)}
                  control={
                    <Radio
                      sx={{
                        width: { xs: "20px", sm: "50px" },
                        height: { xs: "24px", sm: "45px" },
                      }}
                    />
                  }
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
            {/* 오른쪽 라벨 */}
            <Typography
              sx={{
                mb: { xs: 1, sm: 1 },
                ml: { xs: 0, sm: 2 },
                mt: { xs: 1, sm: 0 },
                textAlign: { xs: "right", sm: "center" },
                width: { xs: "100%", sm: "auto" },
                minWidth: { sm: 90 },
              }}
            >
              매우 그렇다
            </Typography>
          </Grid>
        </Grid>
      ))}

      {error && (
        <Grid container alignItems="center" gap={1} sx={{ mt: 2 }}>
          <ErrorIcon sx={{ color: "red" }} />
          <Typography sx={{ color: "red" }}>
            모든 문항에 대한 답을 선택해 주세요!
          </Typography>
        </Grid>
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
