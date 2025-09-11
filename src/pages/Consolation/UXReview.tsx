/**
 * 위로 유형에 대한 사용자 경험 (리커트 5점 척도)
 */
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Grid,
} from "@mui/material";
import React from "react";
import {
  Friendness,
  Effectiveness,
  Continuance,
} from "../../constants/uxreview";

import { likertLabels } from "../../constants/attachment";
// ...existing imports...

const allQuestions = [
  { items: Friendness },
  { items: Effectiveness },
  { items: Continuance },
];

interface UXReviewProps {
  answers: { [key: string]: string };
  setAnswers: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}

const UXReview = ({ answers, setAnswers }: UXReviewProps) => {
  const handleChange =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setAnswers((prev) => ({ ...prev, [id]: e.target.value }));
    };

  return (
    <Stack spacing={4} sx={{ textAlign: "left", mt: 4, width: "650px" }}>
      {allQuestions.map((section, idx) => (
        <Grid container gap={2} key={idx} className="question">
          {section.items.map((q) => (
            <Box key={q.id} sx={{ mb: 3 }}>
              <Typography sx={{ fontSize: "20px", mb: 1 }}>{q.text}</Typography>
              <RadioGroup
                row
                value={answers[q.id] || ""}
                onChange={handleChange(q.id)}
              >
                {[1, 2, 3, 4, 5].map((score) => (
                  <FormControlLabel
                    key={score}
                    value={String(score)}
                    control={<Radio />}
                    label={likertLabels[score]}
                  />
                ))}
              </RadioGroup>
            </Box>
          ))}
        </Grid>
      ))}
    </Stack>
  );
};

export default UXReview;
