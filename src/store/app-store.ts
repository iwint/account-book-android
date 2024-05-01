import { create } from "zustand"
import { useUserStore, useUserStoreProps } from "./user-store"
import { usePartiesStore, usePartiesStoreProps } from "./parties-store"

interface UseAppStoreProps extends useUserStoreProps, usePartiesStoreProps { }

const useAppStore = create<UseAppStoreProps>((set, get) => ({
    ...useUserStore(set, get),
    ...usePartiesStore(set, get)
}))

export default useAppStore
