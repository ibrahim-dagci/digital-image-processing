import { createUseStyles } from "react-jss";

const useStyle = createUseStyles(
    {
        container: {
            display: "flex",
            flexDirection: "column",
        },
        canvasContainer: {
            display: "flex",
            justifyContent: "space-around",
            backgroundColor: "lightslategray",
            alignItems: "center",
        },
        menu: {
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            padding: 10,
            "& button": {
                width: 120,
                height: 60,
                borderRadius: 10,
                backgroundColor: "orange",
            },
        },
        inputMenuContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 2,
        },
        histogramContainer: {
            display: "flex",
            gap: 3,
            width: "100%",
            alignItems: "flex-end",
        },
    },
    {
        name: "FP",
    }
);
export default useStyle;
