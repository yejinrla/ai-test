import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type AnswerItem = { id: string; answer: string };

type AnswersState = {
  items: AnswerItem[];
  add: (itemOrItems: AnswerItem | AnswerItem[]) => void;
  setAll: (items: AnswerItem[]) => void;
  get: (id: string) => string | undefined; // 추가
  clear: () => void;
};

export const useAnswers = create<AnswersState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        add: (itemOrItems) =>
          set((s) => {
            const items = Array.isArray(itemOrItems)
              ? itemOrItems
              : [itemOrItems];
            const updated = [...s.items];

            items.forEach((newItem) => {
              const idx = updated.findIndex((it) => it.id === newItem.id);
              if (idx >= 0) {
                // 이미 있으면 덮어쓰기
                updated[idx] = newItem;
              } else {
                // 없으면 추가
                updated.push(newItem);
              }
            });

            return { items: updated };
          }),
        setAll: (items) => set({ items }),
        get: (id) => get().items.find((item) => item.id === id)?.answer, // 추가
        clear: () => set({ items: [] }),
      }),
      { name: "answers-store" }
    )
  )
);
