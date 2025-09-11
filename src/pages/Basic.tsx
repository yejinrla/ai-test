import React from "react";
import {
  Stack,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { genderOptions, ageOptions, jobOptions } from "../constants/basic";
import { useAnswers } from "../stores/useAnswer";

const About: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = React.useState({
    gender: "",
    age: "",
    job: "",
  });

  const handleChange =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  // 다음
  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();

    useAnswers.getState().add([
      { id: "A1", answer: form.gender },
      { id: "A2", answer: form.age },
      { id: "A3", answer: form.job },
    ]);

    navigate("/attachment");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        <h1 className="title">인구통계학적 특성</h1>
        <p className="explanation">
          다음은 귀하의 인구통계학적 특성에 관한 문항입니다. <br />
          해당하는 항목을 선택해주시길 바랍니다.
        </p>

        <form onSubmit={handleNext}>
          <Stack spacing={4} sx={{ textAlign: "left", mt: 4, width: "500px" }}>
            <FormControl required className="question">
              <FormLabel sx={{ fontSize: "20px", mb: 1 }}>1. 성별</FormLabel>
              <RadioGroup
                row
                value={form.gender}
                onChange={handleChange("gender")}
              >
                {genderOptions.map((opt) => (
                  <FormControlLabel
                    key={opt.value}
                    value={opt.value}
                    control={<Radio />}
                    label={opt.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControl
              required
              sx={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <FormLabel sx={{ fontSize: "20px", mb: 1 }}>2. 연령대</FormLabel>
              <RadioGroup value={form.age} onChange={handleChange("age")}>
                {ageOptions.map((opt) => (
                  <FormControlLabel
                    key={opt.value}
                    value={opt.value}
                    control={<Radio />}
                    label={opt.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControl
              required
              sx={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <FormLabel sx={{ fontSize: "20px", mb: 1 }}>3. 직업</FormLabel>
              <RadioGroup value={form.job} onChange={handleChange("job")}>
                {jobOptions.map((opt) => (
                  <FormControlLabel
                    key={opt.value}
                    value={opt.value}
                    control={<Radio />}
                    label={opt.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Stack>

          <Grid sx={{ mt: 1 }}>
            <Button
              variant="contained"
              sx={{ py: 1, px: 3, mr: "8px", mt: 2 }}
              onClick={() => navigate("/home")}
            >
              이전
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ py: 1, px: 3, mt: 2 }}
            >
              다음
            </Button>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default About;
