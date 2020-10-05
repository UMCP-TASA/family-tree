import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles"

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#03c0dc", // light blue
        },
        secondary: {
            main: "#26deb0",
        },
        background: {
            paper: "#03c0dc", // light blue
            default: "#272b4d", // navy blue
        }
    },
    shape: {
        borderRadius: 8,
    },
    typography: {
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    },
})

export default responsiveFontSizes(theme)
