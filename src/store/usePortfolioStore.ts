import { create } from 'zustand';

interface PortfolioState {
  // Global scroll progress (0..1) over the page
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;

  // Reassemble flag at end
  reassembleAtEnd: boolean;
  setReassembleAtEnd: (val: boolean) => void;

  // Terminal easter egg toggle
  isTerminalOpen: boolean;
  setTerminalOpen: (open: boolean) => void;
  toggleTerminal: () => void;

  // Page background theme interpolation
  currentBgColor: string;
  setCurrentBgColor: (color: string) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  scrollProgress: 0,
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),

  reassembleAtEnd: true,
  setReassembleAtEnd: (reassembleAtEnd) => set({ reassembleAtEnd }),

  isTerminalOpen: false,
  setTerminalOpen: (isTerminalOpen) => set({ isTerminalOpen }),
  toggleTerminal: () => set((state) => ({ isTerminalOpen: !state.isTerminalOpen })),

  currentBgColor: '#0a1020',
  setCurrentBgColor: (currentBgColor) => set({ currentBgColor }),
}));
