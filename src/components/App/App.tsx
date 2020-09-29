import React from "react"

import GlobalStyles from "./GlobalStyles"

type Props = {
    children: React.ReactNode
}

export default ({ children }: Props) => {
    return (
        <>
            <GlobalStyles />
            {children}
        </>
    )
}
