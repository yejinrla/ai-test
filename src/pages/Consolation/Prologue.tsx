/**
 * 프롤로그 (설명)
 */
import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import image from "../../assets/images/image.png";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useConsolationStore } from "../../stores/consolationStore";

const Prologue: React.FC = () => {
  const navigate = useNavigate();
  const getNextRoutes = useConsolationStore((s) => s.getNextRoutes);
  const visit = useConsolationStore((s) => s.visit);

  // 다음
  const goRandomPage = useCallback(() => {
    const nextRoutes = getNextRoutes();

    const route = nextRoutes[Math.floor(Math.random() * nextRoutes.length)];
    visit(route);
    navigate(route);
  }, [getNextRoutes, visit, navigate]);

  return (
    <div className="text-center" style={{ padding: "20px" }}>
      <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
        3가지 위로 유형 챗봇
        <br />
      </Typography>
      <Typography className="explanation" sx={{ mb: 4, mt: 2 }}>
        다음은 3가지 유형의 위로를 제공하는 챗봇과의 대화입니다. <br />
      </Typography>

      <Grid sx={{ border: "1px solid #D1D5DB", borderRadius: "8px" }}>
        <Grid sx={{ backgroundColor: "#F3F4F6", borderRadius: "8px 8px 0 0" }}>
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: "18px",
              padding: "12px",
              borderBottom: "1px solid #D1D5DB",
            }}
          >
            현재 당신의 상황
          </Typography>
        </Grid>
        <Typography
          sx={{ fontSize: "16px", fontWeight: "500", mt: 2, mb: 2, px: 2 }}
        >
          최근 여러 일을 병행하느라 많이 지쳐 있고,
          <br /> 마음의 여유도 거의 없는 상태입니다.
          <br />
          해야 할 일은 계속 쌓이는데,
          <br /> 의욕은 점점 줄어들고 있습니다.
        </Typography>
        <Grid sx={{ mt: 4 }}>
          <img
            src={image}
            style={{
              maxWidth: "80%",
              marginBottom: "20px",
              borderRadius: "8px",
            }}
          />
        </Grid>
      </Grid>

      <Typography variant="body1" sx={{ mb: 1, mt: 2 }}>
        당신은 위로를 받고자 챗봇에게 상황을 털어놓았습니다. <br />
        <br />각 챗봇과의 대화를 마친 후, <br />
        느낀 감정과 생각을 솔직하게 답변해 주세요.
      </Typography>
      <Button
        variant="contained"
        sx={{ py: 1, px: 3, mt: 2 }}
        onClick={goRandomPage}
      >
        다음
      </Button>
    </div>
  );
};

export default Prologue;
