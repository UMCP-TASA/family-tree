import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
    *, *:before, *:after {
        box-sizing: border-box;
        font-family: Futura, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    body {
        margin: 0;
        padding: 0;
    }
`

export default GlobalStyles