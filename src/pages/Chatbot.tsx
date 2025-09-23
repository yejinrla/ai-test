import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Button,
  Checkbox,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import { useAnswers } from "../stores/useAnswer";
import { supabase } from "../lib/supabse";

const Chatbot = () => {
  const navigate = useNavigate();
  const [sectionErrors, setSectionErrors] = useState(false);
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>(
    {}
  );

  const handleChange =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setAnswers((prev) => ({ ...prev, [id]: e.target.value }));
    };

  const handleMultiChange =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setAnswers((prev) => {
        const current = Array.isArray(prev[id]) ? (prev[id] as string[]) : [];
        if (current.includes(value)) {
          return { ...prev, [id]: current.filter((v) => v !== value) };
        } else {
          return { ...prev, [id]: [...current, value] };
        }
      });
    };

  const goNext = async () => {
    if (!answers["H1"] || !answers["H2"] || !answers["H3"]) {
      setSectionErrors(true);
      return;
    }

    useAnswers.getState().add([
      { id: "H1", answer: answers["H1"] as string },
      { id: "H2", answer: (answers["H2"] as string[]).join(", ") },
      { id: "H3", answer: answers["H3"] as string },
    ]);

    const { data, error } = await supabase
      .from("user_answer")
      .select("user_id")
      .order("user_id", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Error fetching latest user_id:", error);
      return;
    }
    const newUserId = data ? data.user_id + 1 : 1;

    const answersToInsert = useAnswers.getState().items.map((item) => ({
      user_id: newUserId,
      id: item.id,
      answer: item.answer,
    }));

    await supabase.from("user_answer").insert(answersToInsert);

    navigate("/epilogue");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
      <div
        className="text-center max-w-2xl mx-auto px:4"
        style={{ width: "100%" }}
      >
        <Typography
          className="title"
          sx={{ fontSize: { xs: "22px", sm: "28px" }, mt: { xs: 2, sm: 4 } }}
        >
          AI 챗봇 사용 경험
        </Typography>
        <Typography
          className="explanation"
          sx={{ fontSize: { xs: "15px", sm: "18px" } }}
        >
          마지막으로 AI 챗봇 사용 경험에 관한 문항입니다. <br />
          (Chat GPT, Gemini, Claude, Replika 등) <br />
          해당하는 항목을 선택해주시길 바랍니다.
        </Typography>
        <Typography sx={{ fontSize: { xs: "15px", sm: "17px" }, mt: 2 }}>
          마지막 질문입니다!
        </Typography>
        <Grid>
          <Stack
            spacing={4}
            sx={{
              textAlign: "left",
              mt: 4,
              width: { xs: "100%", sm: "550px" },
            }}
          >
            {/* H1. 지난 1개월 사용 빈도 */}
            <Box className="question-box" sx={{ p: { xs: 1, sm: 2 } }}>
              <Typography sx={{ fontSize: { xs: "17px", sm: "20px" }, mb: 1 }}>
                H1. 지난 1개월 동안 챗봇 사용 빈도
              </Typography>
              <RadioGroup
                value={answers?.["H1"] || ""}
                onChange={handleChange("H1")}
                sx={{
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: 1, sm: 2 },
                  pl: { xs: 1, sm: 0 },
                }}
              >
                {[
                  "매일 여러 번",
                  "하루 1회",
                  "주 2–3회",
                  "주 1회 이하",
                  "사용 안 함",
                ].map((label, idx) => (
                  <FormControlLabel
                    key={idx}
                    value={label}
                    control={
                      <Radio
                        sx={{
                          width: { xs: "22px", sm: "28px" },
                          height: { xs: "22px", sm: "28px" },
                        }}
                      />
                    }
                    label={
                      <Typography
                        sx={{
                          fontSize: { xs: "13px", sm: "16px" },
                          ml: 1,
                        }}
                      >
                        {label}
                      </Typography>
                    }
                    sx={{ mb: { xs: 1, sm: 0 } }}
                  />
                ))}
              </RadioGroup>
            </Box>

            {/* H2. 주 사용 목적 (복수 선택) */}
            <Box className="question-box" sx={{ p: { xs: 1, sm: 2 } }}>
              <Typography sx={{ fontSize: { xs: "17px", sm: "20px" }, mb: 1 }}>
                H2. 주 사용 목적 (복수 선택 가능)
              </Typography>
              <Grid container spacing={1}>
                {[
                  "정보검색·요약",
                  "번역",
                  "코딩·디버깅",
                  "글쓰기·이메일",
                  "일정·학습계획",
                  "감정·고민상담",
                  "기타",
                ].map((label, idx) => (
                  <Grid key={idx} sx={{ pl: { xs: 1, sm: 0 } }}>
                    <FormControlLabel
                      value={label}
                      control={
                        <Checkbox
                          checked={
                            Array.isArray(answers?.["H2"]) &&
                            (answers?.["H2"] as string[]).includes(label)
                          }
                          onChange={handleMultiChange("H2")}
                          sx={{
                            width: { xs: "22px", sm: "28px" },
                            height: { xs: "22px", sm: "28px" },
                          }}
                        />
                      }
                      label={
                        <Typography
                          sx={{ fontSize: { xs: "13px", sm: "16px" }, ml: 1 }}
                        >
                          {label}
                        </Typography>
                      }
                      sx={{ mb: { xs: 1, sm: 0 } }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* H3. 챗봇 고민상담 경험 */}
            <Box className="question-box" sx={{ p: { xs: 1, sm: 2 } }}>
              <Typography sx={{ fontSize: { xs: "17px", sm: "20px" }, mb: 1 }}>
                H3. AI 챗봇에게 개인적 고민/감정을 이야기해 본 적이 있나요?
              </Typography>
              <RadioGroup
                value={answers["H3"] || ""}
                onChange={handleChange("H3")}
                sx={{
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: 1, sm: 2 },
                  pl: { xs: 1, sm: 0 },
                }}
              >
                <FormControlLabel
                  value="예"
                  control={
                    <Radio
                      sx={{
                        width: { xs: "22px", sm: "28px" },
                        height: { xs: "22px", sm: "28px" },
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{ fontSize: { xs: "13px", sm: "16px" }, ml: 1 }}
                    >
                      예
                    </Typography>
                  }
                  sx={{ mb: { xs: 1, sm: 0 } }}
                />
                <FormControlLabel
                  value="아니오"
                  control={
                    <Radio
                      sx={{
                        width: { xs: "22px", sm: "28px" },
                        height: { xs: "22px", sm: "28px" },
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{ fontSize: { xs: "13px", sm: "16px" }, ml: 1 }}
                    >
                      아니오
                    </Typography>
                  }
                  sx={{ mb: { xs: 1, sm: 0 } }}
                />
              </RadioGroup>
            </Box>
          </Stack>

          {sectionErrors && (
            <Grid container alignItems="center" gap={1} sx={{ mt: 2 }}>
              <ErrorIcon sx={{ color: "error.main" }} />
              <Typography
                sx={{
                  color: "error.main",
                  fontSize: { xs: "14px", sm: "16px" },
                }}
              >
                모든 문항에 답변해 주세요!
              </Typography>
            </Grid>
          )}

          <Button
            variant="contained"
            sx={{
              py: 1,
              px: 3,
              mt: 2,
              fontSize: { xs: "15px", sm: "17px" },
            }}
            onClick={goNext}
          >
            제출
          </Button>
        </Grid>
      </div>
    </div>
  );
};

export default Chatbot;
