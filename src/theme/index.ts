
import { configureFonts, MD3LightTheme } from "react-native-paper";
import { Dimensions } from "react-native";
import { ThemeProp } from "react-native-paper/lib/typescript/types";


declare global {
    namespace ReactNativePaper {
        interface ThemeColors {
            primary: string,
            secondary: string,
            tertiary: string,
            background: string,
            text: string,
            sub_text: string,
            success: string,
            warning: string,
            error: string
        }


    }
}

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
    fonts: any;
    getResponsive: (valueInPixels: number, deviceDimension: "width" | "height") => number;
}



const fontVariations = {
    regular: {
        fontFamily: 'Poppins-Regular',
    },
    medium: {
        fontFamily: 'Poppins-Medium',
    },
    semiBold: {
        fontFamily: 'Poppins-SemiBold',
    },
    bold: {
        fontFamily: 'Poppins-Bold',
    },
    bodySmall: {
        fontFamily: 'Poppins-Regular',
    },
    bodyLarge: {
        fontFamily: 'Poppins-Regular',
    },
    labelSmall: {
        fontFamily: 'Poppins-Regular',
    },
    labelLarge: {
        fontFamily: 'Poppins-Regular',
    },
};

const fontConfig = {
    android: fontVariations,
    ios: fontVariations,
    web: fontVariations,
};

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
        success: "#00BE5F",
        text: "#0A1333",
        warning: "#FF7A19",
        sub_text: "#9EA9D1",
    },

    dimensions: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    fonts: configureFonts(
        {
            config: fontConfig,
            isV3: true
        }
    ),
    getResponsive: getResponsive,
};
