import { create } from "zustand"
import { useUserStore, useUserStoreProps } from "./user-store"
import { usePartiesStore, usePartiesStoreProps } from "./parties-store"
import { useCollectionsStore, useCollectionsStoreProps } from "./collections-store"

interface UseAppStoreProps extends useUserStoreProps, usePartiesStoreProps, useCollectionsStoreProps { }

const useAppStore = create<UseAppStoreProps>((set, get) => ({
    ...useUserStore(set, get),
    ...usePartiesStore(set, get),
    ...useCollectionsStore(set, get)
}))

export default useAppStore
