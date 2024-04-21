
import { MD3LightTheme } from "react-native-paper";
import { Dimensions } from "react-native";

export interface ThemeProps {
    colors: {
        primary: string,
        secondary: string,
        tertiary: string,
        background: string,
        text: string,
        sub_text: string,
        success: string,
        warning: string,
        error: string
    };
    dimensions: {
        width: number;
        height: number;
    };
    fontFamily: {
        regular: string;
        semiBold: string;
        bold: string;
        medium: string;
    };
    getResponsive: (valueInPixels: number, deviceDimension: "width" | "height") => number;
}

const getResponsive = (valueInPixels: number, deviceDimension: "width" | "height"): number => {
    const dimension = Dimensions.get("window")[deviceDimension];
    const valuePercentage = valueInPixels / dimension;
    return dimension * valuePercentage;
};

export const theme: ThemeProps = {
    ...MD3LightTheme,
    colors: {
        primary: "#305EFF",
        secondary: "#0A1333",
        tertiary: "#9EA9D1",
        background: "#F5F7FF",
        error: "#F04438",
        sub_text: "#898E9D",
        success: "#00BE5F",
        text: "#0A1333",
        warning: "#FF7A19"

    },
    dimensions: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    fontFamily: {
        regular: "Poppins-Regular",
        semiBold: "Poppins-SemiBold",
        bold: "Poppins-Bold",
        medium: "Poppins-Medium",
    },
    getResponsive: getResponsive,
};
