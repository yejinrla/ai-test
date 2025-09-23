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
        다음은 3가지 유형의 위로를 <br /> 제공하는 챗봇에 대한 설문입니다.
        <br />
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, mt: 2 }}>
        당신의 상황은 다음과 같습니다. <br /> <br />
        <b>
          최근 여러 일을 병행하느라 많이 지쳐 있고, 마음의 여유도 거의 없는
          상태입니다.
          <br />
          해야 할 일은 계속 쌓이는데, 의욕은 점점 줄어들고 있습니다.{" "}
        </b>
        <br /> <br />
      </Typography>
      <Grid>
        <img src={image} style={{ maxWidth: "80%", marginBottom: "20px" }} />
      </Grid>
      <Typography variant="body1" sx={{ mb: 4, mt: 2 }}>
        당신은 위로를 받고자 챗봇에게 상황을 털어놓았습니다.
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        각 챗봇과의 대화를 마친 후, <br />
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
