import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAnswers } from "../stores/useAnswer";

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    useAnswers.getState().clear(); // 처음에 답변 초기화
  }, []);

  return (
    <Grid
      sx={{ margin: 3 }}
      alignItems="center"
      justifyContent="center"
      container
    >
      <div className="text-center">
        <Typography variant="h4" sx={{ mb: 2 }}>
          안녕하세요!
        </Typography>
        <div className="text-lg text-gray-600 mb-8">
          바쁜 일정 중에도 본 설문에 참여해 주셔서 진심으로 감사드립니다.😊
          <br />
          <br /> 본 조사는
          <Typography
            sx={{ fontWeight: "700", fontSize: "20px", mt: 1, mb: 1 }}
          >
            “AI 챗봇의 위로 표현 유형이 사용자 경험에 미치는 영향 <br />-
            사용자의 애착유형을 중심으로 -” <br />{" "}
          </Typography>
          를 탐구하기 위한 연구입니다. <br /> <br />
          응답은 연구와 통계 목적으로만 사용되며, <br /> 개인식별정보는 수집하지
          않고 모든 응답은 익명으로 처리됩니다.
        </div>
        <Button
          variant="contained"
          sx={{ py: 1, px: 3, mt: 4 }}
          onClick={() => navigate("/basic")}
        >
          다음
        </Button>
      </div>
    </Grid>
  );
};

export default Home;
