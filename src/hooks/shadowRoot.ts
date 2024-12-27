import { create } from 'zustand'

interface ShadowRootState {
  rootElement?: ShadowRoot
  setRootElement: (newRoot: ShadowRoot) => void
}

export const useShadowRoot = create<ShadowRootState>()(
  (set) => ({
    rootElement: undefined,
    setRootElement: (newRoot) => set(() => ({ rootElement: newRoot })),
  })
)