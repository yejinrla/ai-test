import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type AnswerItem = { id: string; answer: string };

type AnswersState = {
  items: AnswerItem[];
  add: (itemOrItems: AnswerItem | AnswerItem[]) => void;
  setAll: (items: AnswerItem[]) => void;
  get: (id: string) => string | undefined; // 추가
};

export const useAnswers = create<AnswersState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        add: (itemOrItems) =>
          set((s) => ({
            items: Array.isArray(itemOrItems)
              ? [...s.items, ...itemOrItems]
              : [...s.items, itemOrItems],
          })),
        setAll: (items) => set({ items }),
        get: (id) => get().items.find((item) => item.id === id)?.answer, // 추가
      }),
      { name: "answers-store" }
    )
  )
);
