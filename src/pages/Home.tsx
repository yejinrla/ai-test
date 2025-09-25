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
      sx={{ margin: 3, color: "text.primary" }}
      alignItems="center"
      justifyContent="center"
      container
    >
      <div className="text-center">
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "600" }}>
          안녕하세요!👋
        </Typography>
        <div>
          저는 홍익대학교 영상커뮤니케이션대학원 <br />
          인터랙션디자인학과에 재학 중인 김예진입니다.
          <br />
          <br />
          바쁜 일정 중에도 본 설문에 참여해 주셔서 <br />
          진심으로 감사드립니다.
          <br />
          <hr
            style={{
              margin: "24px 0",
              border: "none",
              borderTop: "1px solid #D1D5DB",
            }}
          />
          <Typography sx={{ textAlign: "left", fontWeight: "600" }}>
            📌 연구 주제
          </Typography>
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "18px",
              mt: 1,
              mb: 1,
              color: "primary.main",
            }}
          >
            “AI 챗봇의 위로 표현 유형이 사용자 경험에 미치는 영향 <br />-
            사용자의 애착유형을 중심으로 -” <br />{" "}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            본 조사는 위 주제를 탐구하기 위한 연구입니다. <br />
            응답은 연구와 통계 목적으로만 사용되며, <br /> 개인식별정보는
            수집하지 않고 모든 응답은 익명으로 처리됩니다.
          </Typography>
          <Typography sx={{ mt: 2, fontSize: "14px" }}>
            * 마지막 페이지에서 애착유형을 확인하실 수 있습니다!
          </Typography>
          <Grid
            container
            alignItems="center"
            sx={{
              mt: 3,
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 1, sm: 10 },
              alignItems: { xs: "flex-start", sm: "center" },
            }}
          >
            <Typography sx={{ textAlign: "left", fontWeight: "600" }}>
              ⏰ 소요 시간
            </Typography>
            <Typography
              sx={{
                textAlign: "left",
                fontWeight: "600",
                mt: { xs: 0.5, sm: 0 },
              }}
            >
              약 5분
            </Typography>
          </Grid>
          <Grid
            container
            alignItems="flex-start"
            sx={{
              mt: 3,
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 1, sm: 10 },
            }}
          >
            <Typography sx={{ textAlign: "left", fontWeight: "600" }}>
              🎁 참여 혜택
            </Typography>
            <Typography
              sx={{
                textAlign: "left",
                fontSize: { xs: "14px", sm: "16px" },
                mt: { xs: 0.5, sm: 0 },
              }}
            >
              성함과 번호를 남겨주신 분들 중 <br />
              추첨을 통해 <b>스타벅스 기프티콘</b>을 드립니다 🍵 <br />
            </Typography>
          </Grid>
          <Grid
            container
            alignItems="flex-start"
            sx={{
              mt: 3,
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 1, sm: 10 },
            }}
          >
            <Typography sx={{ textAlign: "left", fontWeight: "600" }}>
              📧 연구 문의
            </Typography>
            <Typography
              sx={{
                textAlign: "left",
                mt: { xs: 0.5, sm: 0 },
              }}
            >
              yejinrla97@gmail.com
            </Typography>
          </Grid>
        </div>
        <Button
          variant="contained"
          sx={{ py: 1, px: 3, mt: 4, width: 140 }}
          onClick={() => navigate("/basic")}
        >
          설문 시작
        </Button>
      </div>
    </Grid>
  );
};

export default Home;
