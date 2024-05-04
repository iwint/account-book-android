import { DELETE_API, GET_API, POST_API, PUT_API } from "../api/api";

export interface useCollectionsStoreProps {
    collections: any;
    addCollections: (data: any, userId: string) => Promise<any>;
    getAllCollections: (partyId: string, userId: string) => Promise<any>;
    deleteCollection: (collectionId: string, userId: string, partyId: string) => Promise<any>;
    updateCollection: (collectionId: string, userId: string, data: any) => Promise<any>;
}

export const useCollectionsStore = (set: any, get: any): useCollectionsStoreProps => {
    return {
        collections: {},
        addCollections: (data, userId) => {
            return new Promise((resolve, reject) => {
                POST_API(`collection/create?userid=${userId}`, data).then((response: any) => {
                    if (response.status === "ok") {
                        set({
                            collections: {
                                ...get().collections,
                                [data?.partyId]: [...get().collections[data?.partyId], data]
                            }
                        })
                        resolve(response)
                    } else {
                        reject(response)
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getAllCollections: (partyId, userId) => {
            return new Promise((resolve, reject) => {
                GET_API(`collection/get/${partyId}?userid=${userId}`).then((response: any) => {
                    if (response.data) {
                        set({
                            collections: {
                                ...get().collections,
                                [partyId]: response.data
                            }
                        })
                        resolve(response)
                    } else {
                        reject(response)
                    }
                })
            })
        },
        deleteCollection: (collectionId, userId, partyId) => {
            return new Promise((resolve, reject) => {
                DELETE_API(`collection/delete/${collectionId}?userid=${userId}&partyID=${partyId}`).then((response: any) => {
                    let existing = [...get().collections[partyId]]
                    if (response.status === "ok") {
                        let updated = existing.filter((item: any) => item._id !== collectionId)
                        set({
                            collections: {
                                ...get().collections,
                                [partyId]: updated
                            }
                        })
                        resolve(response)
                    }
                }).catch(err => reject(err))
            })
        },
        updateCollection: (collectionId, userId, data) => {
            return new Promise((resolve, reject) => {
                PUT_API(`collection/update/${collectionId}?userid=${userId}`, data).then((response: any) => {
                    if (response.status === 'ok') {
                        let existing = [...get().collections[data?.partyId]]
                        let updated = existing.map((item: any) => item._id === collectionId ? data : item)
                        set({
                            collections: {
                                ...get().collections,
                                [data?.partyId]: updated
                            }
                        })
                        resolve(response)
                    }
                }).catch(err => reject(err))
            })
        }
    }
}