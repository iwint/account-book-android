
export interface useCollectionsStoreProps {
    collections: Array<any>;
}

export const useCollectionsStore = (set: any, get: any): useCollectionsStoreProps => {
    return {
        collections: [],
    }
}