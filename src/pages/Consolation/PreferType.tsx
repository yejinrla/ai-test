import {
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  TextField,
  Grid,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { botReplies } from "../../constants/consolation";
import { useNavigate } from "react-router";
import { useAnswers } from "../../stores/useAnswer";
import ErrorIcon from "@mui/icons-material/Error";

const PreferType = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [error, setError] = useState(false);
  const [reason, setReason] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
    setError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) {
      setError(true);
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    useAnswers.getState().add([{ id: "G1", answer: selected }]);
    useAnswers.getState().add([{ id: "G2", answer: reason }]);

    navigate("/chatbot");
  };

  return (
    <Grid
      sx={{
        color: "text.primary",
        px: { xs: 1, sm: 0 },
        maxWidth: { xs: "100%", sm: 600 },
        margin: "0 auto",
      }}
    >
      <Typography
        className="title"
        sx={{ fontSize: { xs: "22px", sm: "28px" }, mt: { xs: 2, sm: 4 } }}
      >
        위로 유형 선호도 조사
      </Typography>
      <Typography
        className="explanation"
        sx={{ fontSize: { xs: "15px", sm: "18px" } }}
      >
        다음은 3가지 위로 유형 선호도 조사 문항입니다. <br />
        해당하는 항목을 선택해주시길 바랍니다.
      </Typography>
      <hr
        style={{
          margin: "24px 0",
          border: "none",
          borderTop: "1px solid #D1D5DB",
        }}
      />
      <Typography
        sx={{
          fontSize: { xs: "17px", sm: "20px" },
          fontWeight: "600",
          mt: { xs: 2, sm: 4 },
        }}
        className="question"
      >
        세 유형 중 가장 좋았던 위로 답변은 무엇이었나요?
      </Typography>
      <form onSubmit={handleSubmit}>
        <RadioGroup
          value={selected}
          onChange={handleChange}
          sx={{ pl: 1, mt: 2 }}
        >
          {botReplies.map((item) => (
            <FormControlLabel
              key={item.type}
              value={item.type}
              control={
                <Radio
                  sx={{
                    width: { xs: "22px", sm: "28px" },
                    height: { xs: "22px", sm: "28px" },
                  }}
                />
              }
              label={
                <Box
                  sx={{
                    textAlign: "left",
                    // mt: "7px",
                    width: { xs: "100%", sm: "400px" },
                    ml: { xs: 1, sm: 2 },
                  }}
                >
                  <strong style={{ fontSize: "16px" }}>{item.type}</strong>
                  <Box
                    sx={{
                      background: "#f3f4f6",
                      borderRadius: "8px",
                      padding: { xs: "10px", sm: "16px" },
                      whiteSpace: "pre-line",
                      fontSize: { xs: "14px", sm: "16px" },
                      lineHeight: 1.7,
                      mt: "8px",
                      width: "95%",
                    }}
                  >
                    {item.text}
                  </Box>
                </Box>
              }
              sx={{
                mb: { xs: 2, sm: 3 },
                alignItems: "flex-start",
                width: "100%",
              }}
            />
          ))}
        </RadioGroup>
        {error && (
          <Grid container alignItems="center" gap={1} sx={{ mt: 2 }}>
            <ErrorIcon sx={{ color: "red" }} />
            <Typography sx={{ color: "red" }}>
              위로 유형 하나를 선택해 주세요!
            </Typography>
          </Grid>
        )}
        <TextField
          label="해당 유형을 선택한 이유를 자유롭게 작성해주세요."
          required
          multiline
          fullWidth
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          sx={{
            mt: 2,
            fontSize: { xs: "14px", sm: "16px" },
            "& .MuiInputBase-input": { fontSize: { xs: "14px", sm: "16px" } },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            py: 1,
            px: 3,
            mt: 3,
            fontSize: { xs: "15px", sm: "17px" },
          }}
        >
          다음
        </Button>
      </form>
    </Grid>
  );
};

export default PreferType;
