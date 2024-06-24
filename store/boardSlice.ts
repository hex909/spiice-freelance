import { getStoreValue, setStoreValue } from "@/util/ayncStore";
import { create } from "zustand";

type BoardValueType = "done" | "not" | "";

interface IBoardSlice {
  isOnBoarding: BoardValueType;
  onBoardingCompletion: () => void;
  setOnBoardingUpdate: (value: BoardValueType) => void;
}

export const useOnBoardSlice = create<IBoardSlice>((set) => {
  const initialState: BoardValueType = "";

  getStoreValue("onboard").then((value) => {
    if (value === "done" || value === "not") {
      set({ isOnBoarding: value });
    } else {
      set({ isOnBoarding: "not" });
    }
  });

  return {
    isOnBoarding: initialState,
    onBoardingCompletion: () => {
      setStoreValue("onboard", "done");
      set(() => ({ isOnBoarding: "done" }));
    },
    setOnBoardingUpdate: (value) => {
      setStoreValue("onboard", value);
      set(() => ({ isOnBoarding: value }));
    },
  };
});
