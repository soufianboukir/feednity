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


interface LoadingState {
  loading: boolean
  setLoading: (state: boolean) => void
}

export const useGlobalLoading = create<LoadingState>((set) => ({
  loading: false,
  setLoading: (state) => set({ loading: state }),
}))
