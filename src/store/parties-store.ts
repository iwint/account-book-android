import { GET_API, POST_API } from "../api/api";


interface StatisticProps {
    suppliers_statistics: any;
    customers_statistics: any;
}

interface PartiesProps {
    customer: Array<any>;
    supplier: Array<any>;
}

export interface usePartiesStoreProps {
    party: any,
    statistics: StatisticProps;
    parties: PartiesProps;
    getAllStatistics: (userId: string, type: "SUPPLIER" | 'CUSTOMER') => Promise<any>;
    getAllParties: (userId: string, type: "SUPPLIER" | 'CUSTOMER') => Promise<any>;
    getStaticId: (type: "SUPPLIER" | 'CUSTOMER') => string;
    addParty: (userId: string, data: any) => Promise<any>;
    getPartyById: (partyId: string, userId: string) => Promise<any>
}

export const usePartiesStore = (set: any, get: any): usePartiesStoreProps => {
    return {
        party: null,
        parties: {} as PartiesProps,
        statistics: {} as StatisticProps,
        getAllStatistics: (userId, type) => {
            return new Promise((resolve, reject) => {
                GET_API(`statics/get?userid=${userId}&type=${type}`).then((response: any) => {
                    console.log("STAT RES", response);

                    if (response.data) {
                        if (type === 'SUPPLIER') {
                            set({ statistics: { ...get().statistics, suppliers_statistics: response.data } });
                        } else {
                            set({ statistics: { ...get().statistics, customers_statistics: response.data } });
                        }
                        resolve(response);
                    } else {
                        reject(response);
                    }
                });
            });
        },
        getAllParties: (userId, type) => {
            console.log("GET ALL PARTIES", userId, type);
            let staticsId = get().statistics[type === "CUSTOMER" ? "customers_statistics" : "suppliers_statistics"]?._id
            console.log("STAT ID", staticsId);
            return new Promise((resolve, reject) => {
                GET_API(`party/get/${staticsId}?userid=${userId}`).then((response: any) => {
                    if (response.data) {
                        if (type === 'SUPPLIER') {
                            set({ parties: { ...get().parties, supplier: response.data } });
                        } else {
                            set({ parties: { ...get().parties, customer: response.data } });
                        }
                        resolve(response);
                    } else {
                        reject(response);
                    }
                });
            });
        },
        getStaticId: (type) => {
            console.log(get().statistics);

            return get().statistics[type === "CUSTOMER" ? "customers_statistics" : "suppliers_statistics"]?._id
        },
        addParty: (userId, data) => {
            return new Promise((resolve, reject) => {
                POST_API(`party/create?userid=${userId}`, data).then((response: any) => {
                    if (response.status === "ok") {
                        let type = data.type
                        if (type === "SUPPLIER") {
                            set({
                                parties: {
                                    ...get().parties,
                                    supplier: [...get().parties.supplier, data]
                                }
                            })
                        } else {
                            set({
                                parties: {
                                    ...get().parties,
                                    customer: [...get().parties.customer, data]
                                }
                            })
                        }
                        resolve(response);
                    } else {
                        reject(response);
                    }
                }).catch(err => {
                    reject(err);
                });
            });
        },
        getPartyById: (partyId, userId) => {
            return new Promise((resolve, reject) => {
                GET_API(`party/getinit/${partyId}?userid=${userId}`).then((response: any) => {
                    if (response.data) {
                        set({
                            party: response.data
                        })
                        resolve(response.data)
                    } else {
                        reject(response)
                    }
                }).catch(err => reject(err))
            })
        }
    };
};
