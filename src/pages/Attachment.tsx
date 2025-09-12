import { useState } from "react";
import {
  Box,
  Typography,
  Radio,
  Button,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
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
  };

  // 다음
  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();

    // 모든 문항 응답했는지 확인
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom className="title">
        애착유형
      </Typography>
      <p className="explanation">
        다음은 귀하의 애착유형에 관한 문항입니다. <br />
        해당하는 항목을 선택해주시길 바랍니다.
      </p>
      <Divider sx={{ mb: 2, borderColor: "grey.400", borderBottomWidth: 2 }} />
      <TableContainer sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "20px", textAlign: "center" }}>
                질문
              </TableCell>
              {[1, 2, 3, 4, 5, 6, 7].map((score) => (
                <TableCell key={score} align="center">
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="stretch"
                    justifyContent="space-between"
                    width="80px"
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        mb: 1,
                        fontWeight: 600,
                        fontSize: "15px",
                        height: "80px",
                      }}
                    >
                      {likertLabels[score]?.split(" ").map((word, idx, arr) =>
                        idx < arr.length - 1 ? (
                          <span key={idx}>
                            {word}
                            <br />
                          </span>
                        ) : (
                          word
                        )
                      )}
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {score}
                    </Typography>
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {attachmentQuestions.map((q) => (
              <TableRow key={q.id}>
                <TableCell>
                  <Typography sx={{ fontSize: "16px" }}>
                    {q.id}. {q.text}
                  </Typography>
                </TableCell>
                {[1, 2, 3, 4, 5, 6, 7].map((score) => (
                  <TableCell key={score} align="center">
                    <Radio
                      checked={answers[q.id] === String(score)}
                      onChange={() => handleChange(q.id, String(score))}
                      value={score}
                      name={`q-${q.id}`}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {error && (
        <Typography sx={{ color: "red", mt: 0.5, mb: 2 }}>
          모든 문항에 응답해주세요!
        </Typography>
      )}
      <Grid>
        <Button
          type="submit"
          variant="contained"
          sx={{ py: 1, px: 3, mr: "8px" }}
          onClick={() => navigate("/basic")}
        >
          이전
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{ py: 1, px: 3 }}
          onClick={handleNext}
        >
          다음
        </Button>
      </Grid>
    </Box>
  );
}
