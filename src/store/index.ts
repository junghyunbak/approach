import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { devtools } from "zustand/middleware";

import { createMarkerMenuSlice } from "./slices/markerMenu";

export type StoreState = ReturnType<typeof createMarkerMenuSlice>;

const useStoreBase = create<StoreState>()(
  devtools((...a) => ({
    ...createMarkerMenuSlice(...a),
  }))
);

const useStore = <T>(selector: (state: StoreState) => T) => {
  return useStoreBase(selector, shallow);
};

export default useStore;
