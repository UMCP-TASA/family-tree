import React from "react"

import { DataContext } from "."
import { NodeType } from "components/Tree"

type Props = {
    tree?: NodeType
}

export default function TreeUpdater(props: Props) {
    const { tree } = props
    const { setTree } = React.useContext(DataContext)

    React.useEffect(() => {
        if (tree) setTree(tree)
    }, [tree])

    return <></>
}
