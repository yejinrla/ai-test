/**
 * 에필로그
 * 사용자의 애착유형과 선호하는 위로 유형을 알려준다.
 */

import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAnswers } from "../stores/useAnswer";

const Epilogue = () => {
  const navigate = useNavigate();

  function classifyLevel(z: number): "Low" | "Average" | "High" {
    if (z <= -0.5) return "Low";
    if (z >= 0.5) return "High";
    return "Average";
  }

  const calculateAttachmentType = () => {
    // 여기에 애착유형 계산 로직 추가 (현재는 더미 데이터)
    const answers = useAnswers.getState().items;

    // 규준 평균 & 표준편차 (Wei et al., 2007)
    const anxietyMean = 21.73;
    const anxietySD = 7.04;
    const avoidanceMean = 18.24;
    const avoidanceSD = 6.36;

    // 불안 점수 계산
    const anxietyIds = ["B02", "B04", "B06", "B08", "B10", "B12"];
    const anxietyReverseIds = ["B08"];
    const anxietyScores = anxietyIds.map((id) => {
      const item = answers.find((a) => a.id === id);
      if (!item) return 0;
      const score = Number(item.answer);
      return anxietyReverseIds.includes(id) ? 8 - score : score;
    });

    const anxietyTotal = anxietyScores.reduce((a, b) => a + b, 0);

    // 회피 점수 계산
    const avoidanceIds = ["B01", "B03", "B05", "B07", "B09", "B11"];
    const avoidanceReverseIds = ["B01", "B05", "B09"];
    const avoidanceScores = avoidanceIds.map((id) => {
      const item = answers.find((a) => a.id === id);
      if (!item) return 0;
      const score = Number(item.answer);
      return avoidanceReverseIds.includes(id) ? 8 - score : score;
    });
    const avoidanceTotal = avoidanceScores.reduce((a, b) => a + b, 0);

    // Z점수 계산
    const anxietyZ = (anxietyTotal - anxietyMean) / anxietySD;
    const avoidanceZ = (avoidanceTotal - avoidanceMean) / avoidanceSD;

    const anxietyLevel = classifyLevel(anxietyZ);
    const avoidanceLevel = classifyLevel(avoidanceZ);

    let attachmentType = "";

    if (anxietyLevel !== "High" && avoidanceLevel !== "High") {
      attachmentType = "안정형";
    } else if (anxietyLevel === "High" && avoidanceLevel !== "High") {
      attachmentType = "불안형";
    } else if (anxietyLevel !== "High" && avoidanceLevel === "High") {
      attachmentType = "회피형";
    } else if (anxietyLevel === "High" && avoidanceLevel === "High") {
      attachmentType = "두려운 회피형";
    }

    return attachmentType;
  };

  const attachmentType = calculateAttachmentType();

  return (
    <Grid sx={{ color: "text.primary", textAlign: "center", mt: 4 }}>
      <h1>❤️</h1>
      <Typography>
        당신의 애착유형은 <b>{attachmentType}</b>입니다!
      </Typography>
      <br />
      가장 선호하는 위로 유형은{" "}
      <b>
        {useAnswers.getState().items.find((a) => a.id === "G1")?.answer}
      </b>{" "}
      이었군요 😁
      <br />
      <br />
      <Typography>설문에 참여해주셔서 감사합니다!</Typography>
      <Button
        variant="contained"
        sx={{ py: 1, px: 3, mt: 2 }}
        onClick={() => navigate("/home")}
      >
        처음으로
      </Button>
    </Grid>
  );
};
export default Epilogue;
