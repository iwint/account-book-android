import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAuthToken = async () => {
    const token = await AsyncStorage.getItem('token');
    return token;
};
