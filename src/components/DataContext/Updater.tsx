import React from "react"

import { DataContext, DataContextValue } from "."

type Props = {
    data: DataContextValue
    children?: React.ReactNode
}

export default function Updater(props: Props) {
    const { data, children } = props
    const { setData } = React.useContext(DataContext)

    React.useEffect(() => {
        setData(data)
    }, [data])

    return <>{children}</>
}