import React from "react"
import {DataContext, DataContextType} from "."

type Props = {
    children: (context: DataContextType) => React.ReactNode
}

export default function Consumer(props: Props) {
    const { children } = props
    return (
        <DataContext.Consumer>
            {children}
        </DataContext.Consumer>
    )
}