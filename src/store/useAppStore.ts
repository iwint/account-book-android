import { create } from "zustand"

interface UseAppStoreProps {
    allParties: Array<any>,
    getAllParties: () => Promise<any>
}

const useAppStore = create<UseAppStoreProps>((set, get) => ({
    allParties: [],
    getAllParties: () => {
        return new Promise((resolve, reject) => {

        })
    }

}))

export default useAppStore
