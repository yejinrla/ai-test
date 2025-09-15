import { useState, memo } from "react";
import { TextField, Box, Typography, Grid } from "@mui/material";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

const CommentBox = memo(() => {
  const [comment, setComment] = useState("");

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container alignItems="center" sx={{ mb: 2 }}>
        <TipsAndUpdatesIcon
          sx={{ verticalAlign: "middle", mr: 1, color: "primary.main" }}
        />
        <Typography sx={{ fontSize: "18px" }}>
          해당 챗봇에 대한 의견을 자유롭게 작성해주세요
        </Typography>
      </Grid>
      <TextField
        multiline
        rows={3}
        fullWidth
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="의견 작성이 필수는 아니지만, 연구자에게 큰 도움이 됩니다.😊"
      />
      {/* 저장은 부모에서 "다음" 버튼 눌렀을 때 */}
      <input type="hidden" value={comment} />
    </Box>
  );
});

export default CommentBox;
