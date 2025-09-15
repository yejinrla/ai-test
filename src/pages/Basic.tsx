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
  Typography,
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

  const [errors, setErrors] = React.useState({
    gender: false,
    age: false,
    job: false,
  });

  const handleChange =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [key]: value }));
      // 선택하면 해당 필드 에러 해제
      setErrors((prev) => ({ ...prev, [key]: false }));
    };

  // 다음
  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();

    // ⬇️ 비어있는 항목 에러 표시
    const nextErrors = {
      gender: !form.gender,
      age: !form.age,
      job: !form.job,
    };
    setErrors(nextErrors);

    // 하나라도 에러면 진행 중단
    if (nextErrors.gender || nextErrors.age || nextErrors.job) return;

    window.scrollTo({ top: 0, behavior: "smooth" });

    // 응답 저장
    useAnswers.getState().add([
      { id: "A1", answer: form.gender },
      { id: "A2", answer: form.age },
      { id: "A3", answer: form.job },
    ]);

    navigate("/attachment");
  };

  return (
    <div>
      <div className="text-center max-w-2xl mx-auto px-4">
        <h1 className="title">인구통계학적 특성</h1>
        <p className="explanation">
          다음은 귀하의 인구통계학적 특성에 관한 문항입니다. <br />
          해당하는 항목을 선택해주시길 바랍니다.
        </p>

        <form onSubmit={handleNext}>
          <Stack
            spacing={4}
            sx={{
              textAlign: "left",
              mt: 4,
              width: { xs: "100%", sm: "400px", md: "500px" },
            }}
          >
            <FormControl
              required
              className="question-box"
              sx={{ borderColor: errors.gender ? "red !important" : "inherit" }}
            >
              <FormLabel className="question">1. 성별</FormLabel>
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
              {errors?.gender && (
                <Typography sx={{ color: "red", mt: 0.5 }}>
                  성별을 선택해주세요!
                </Typography>
              )}
            </FormControl>

            <FormControl
              required
              className="question-box"
              sx={{ borderColor: errors.age ? "red !important" : "inherit" }}
            >
              <FormLabel className="question">2. 연령대</FormLabel>
              <Typography variant="body2" sx={{ mb: 1, color: "gray" }}>
                (만 나이 기준)
              </Typography>
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
              {errors?.age && (
                <Typography sx={{ color: "red", mt: 0.5 }}>
                  연령대를 선택해주세요!
                </Typography>
              )}
            </FormControl>

            <FormControl
              required
              className="question-box"
              sx={{ borderColor: errors.job ? "red !important" : "inherit" }}
            >
              <FormLabel className="question">3. 직업</FormLabel>
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
              {errors?.job && (
                <Typography sx={{ color: "red", mt: 0.5 }}>
                  직업을 선택해주세요!
                </Typography>
              )}
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
