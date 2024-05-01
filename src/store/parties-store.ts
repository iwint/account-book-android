import { GET_API } from "../api/api";


interface StatisticProps {
    suppliers_statistics: any;
    customers_statistics: any;
}

interface PartiesProps {
    customer: Array<any>;
    supplier: Array<any>;
}

export interface usePartiesStoreProps {
    statistics: StatisticProps;
    parties: PartiesProps;
    getAllStatistics: (userId: string, type: "SUPPLIER" | 'CUSTOMER') => Promise<any>;
    getAllParties: (userId: string, type: "SUPPLIER" | 'CUSTOMER') => Promise<any>;
    // addParty: (userId: string, data: any) => Promise<any>;
}

export const usePartiesStore = (set: any, get: any): usePartiesStoreProps => {
    return {
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
            let staticsId = get().statistics[type === "CUSTOMER" ? "customer_statistics" : "suppliers_statistics"]
            return new Promise((resolve, reject) => {
                GET_API(`party/get/${staticsId}?userid=${userId}`).then((response: any) => {
                    let type = get().statistics
                    if (response.data) {

                    } else {
                        reject(response);
                    }
                });
            });
        },
    };
};
