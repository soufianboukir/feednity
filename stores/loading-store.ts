import { create } from 'zustand';

type LoadingState = {
  loading: boolean;
  setLoading: (state: boolean) => void;
};

export const useGlobalLoading = create<LoadingState>((set) => ({
  loading: false,
  setLoading: (state) => set({ loading: state }),
}));