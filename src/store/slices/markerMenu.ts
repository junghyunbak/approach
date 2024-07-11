import type { StateCreator } from "zustand";

export type MarkerMenuSlice = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  x: number;
  y: number;
  setPos: (x: number, y: number) => void;
};

export const createMarkerMenuSlice: StateCreator<MarkerMenuSlice> = (
  set
): MarkerMenuSlice => {
  return {
    isOpen: false,
    setIsOpen: (isOpen: boolean) => {
      set(() => ({ isOpen }));
    },
    x: 0,
    y: 0,
    setPos: (x: number, y: number) => {
      set(() => ({ x, y }));
    },
  };
};
