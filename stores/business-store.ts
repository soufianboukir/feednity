import { create } from "zustand"
import { Business } from "@/types"

interface ActiveBusinessState {
  activeBusiness?: Business
  setActiveBusiness: (busi: Business) => void
}

export const useActiveBusiness = create<ActiveBusinessState>((set) => ({
  activeBusiness: undefined,
  setActiveBusiness: (busi) => set({ activeBusiness: busi }),
}))

