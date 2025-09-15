/**
 * 에필로그
 * 사용자의 애착유형과 선호하는 위로 유형을 알려준다.
 */

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Epilogue = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>❤️</h1>
      <p>설문에 참여해주셔서 감사합니다!</p>
      <p>이 세상 모든 연구자들 화이팅 💪</p>
      <Button
        variant="contained"
        sx={{ py: 1, px: 3, mt: 2 }}
        onClick={() => navigate("/home")}
      >
        처음으로
      </Button>
    </div>
  );
};
export default Epilogue;
