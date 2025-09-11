import { create } from "zustand";

const NEXT_ROUTES = [
  "/consolation/information",
  "/consolation/encouragement",
  "/consolation/emotion",
];

interface ConsolationState {
  visited: string[];
  visit: (route: string) => void;
  getNextRoutes: () => string[];
  reset: () => void;
}

export const useConsolationStore = create<ConsolationState>((set, get) => ({
  visited: [],
  visit: (route) =>
    set((state) =>
      state.visited.includes(route)
        ? state
        : { visited: [...state.visited, route] }
    ),
  getNextRoutes: () =>
    NEXT_ROUTES.filter((route) => !get().visited.includes(route)),
  reset: () => set({ visited: [] }),
}));
