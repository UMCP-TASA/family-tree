import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles"

// A custom theme for this app
// Custom palettes added in declarations.d.ts
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
        },

        // custom colors defined in types/createPalette
        parentNode: { 
            main: "#03c0dc", // light blue
            contrastText: "#ffffff", // white
        },
        leafNode: {
            main: "#26deb0", // light green
            contrastText: "#26deb0",
        },
        link: {
            main: "rgb(254,110,158,0.6)",
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
