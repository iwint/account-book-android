import { create } from "zustand"
import { useUserStore, useUserStoreProps } from "./user-store"

interface UseAppStoreProps extends useUserStoreProps { }

const useAppStore = create<UseAppStoreProps>((set, get) => ({
    ...useUserStore(set, get)
}))

export default useAppStore
