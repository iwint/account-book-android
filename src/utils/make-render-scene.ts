import { TabDataProps } from "../components/sections/tab-view";

export const makeRenderScene = (data: Array<TabDataProps>) => {
    let scenes = {};
    data.map((item) => {
        scenes = {
            ...scenes,
            [item.key]: item.component,
        };
    });
    console.log(scenes);
    return scenes;
};