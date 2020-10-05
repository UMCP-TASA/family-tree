import React from "react"
import { ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import theme from "./theme"

type Props = {
    children: React.ReactNode
}

export default ({ children }: Props) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
