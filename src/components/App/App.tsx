import React from "react"
import { ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import { darkTheme, lightTheme } from "./theme"

type Props = {
    children: React.ReactNode
}

export default ({ children }: Props) => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
