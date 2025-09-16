/**
 * 챗봇에 대한 질문
 */

import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Grid,
  Button,
  Checkbox,
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

  // 단일 선택 핸들러
  const handleChange =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setAnswers((prev) => ({ ...prev, [id]: e.target.value }));
    };

  // 복수 선택 핸들러
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

  // 제출
  const goNext = async () => {
    // 간단히 모든 질문 체크 여부 확인
    if (!answers["G1"] || !answers["G2"] || !answers["G3"]) {
      setSectionErrors(true);
      return;
    }

    useAnswers.getState().add([
      { id: "G1", answer: answers["G1"] as string },
      { id: "G2", answer: (answers["G2"] as string[]).join(", ") },
      { id: "G3", answer: answers["G3"] as string },
    ]);

    // 데이터 확인
    console.log(useAnswers.getState().items);

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
    const newUserId = data ? data.user_id + 1 : 1; // 새 user_id 계산

    const answersToInsert = useAnswers.getState().items.map((item) => ({
      user_id: newUserId,
      id: item.id,
      answer: item.answer,
    }));

    // DB에 저장
    await supabase.from("user_answer").insert(answersToInsert);

    navigate("/epilogue"); // 👉 다음 경로 필요에 따라 수정
  };

  return (
    <div className="text-center max-w-2xl mx-auto px-4">
      <h1 className="title">챗봇 사용 경험</h1>
      <p className="explanation">
        다음은 챗봇 사용 경험에 관한 문항입니다. <br />
        해당하는 항목을 선택해주시길 바랍니다.
      </p>
      <p>
        마지막 질문입니다! <br />
      </p>
      <Grid>
        <Stack
          spacing={4}
          sx={{
            textAlign: "left",
            mt: 4,
            width: { xs: "100%", sm: "400px", md: "500px" },
          }}
        >
          {/* G1. 지난 1개월 사용 빈도 */}
          <Box className="question-box">
            <Typography className="question">
              G1. 지난 1개월 동안 챗봇 사용 빈도
            </Typography>
            <RadioGroup
              value={answers?.["G1"] || ""}
              onChange={handleChange("G1")}
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
                  control={<Radio />}
                  label={label}
                />
              ))}
            </RadioGroup>
          </Box>

          {/* G2. 주 사용 목적 (복수 선택) */}
          <Box className="question-box">
            <Typography className="question">
              G2. 주 사용 목적 (복수 선택 가능)
            </Typography>
            {[
              "정보검색·요약",
              "번역",
              "코딩·디버깅",
              "글쓰기·이메일",
              "일정·학습계획",
              "감정·고민상담",
              "기타",
            ].map((label, idx) => (
              <FormControlLabel
                key={idx}
                value={label}
                control={
                  <Checkbox
                    checked={
                      Array.isArray(answers?.["G2"]) &&
                      (answers?.["G2"] as string[]).includes(label)
                    }
                    onChange={handleMultiChange("G2")}
                  />
                }
                label={label}
              />
            ))}
          </Box>

          {/* G3. 챗봇 고민상담 경험 */}
          <Box className="question-box">
            <Typography className="question">
              G3. AI 챗봇에게 개인적 고민/감정을 이야기해 본 적이 있나요?
            </Typography>
            <RadioGroup
              value={answers["G3"] || ""}
              onChange={handleChange("G3")}
            >
              <FormControlLabel value="예" control={<Radio />} label="예" />
              <FormControlLabel
                value="아니오"
                control={<Radio />}
                label="아니오"
              />
            </RadioGroup>
          </Box>
        </Stack>

        {/* 에러 메시지 */}
        {sectionErrors && (
          <Grid container alignItems="center" gap={1} sx={{ mt: 2 }}>
            <ErrorIcon sx={{ color: "red" }} />
            <Typography sx={{ color: "red" }}>
              모든 문항에 답변해 주세요!
            </Typography>
          </Grid>
        )}

        {/* 다음 버튼 */}
        <Button
          variant="contained"
          sx={{ py: 1, px: 3, mt: 2 }}
          onClick={goNext}
        >
          제출
        </Button>
      </Grid>
    </div>
  );
};

export default Chatbot;
