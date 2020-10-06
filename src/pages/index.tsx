import React from "react"
import { makeStyles } from "@material-ui/core"
import { ZoomContainer, ZoomSVG } from "components/Zoom"
import data from "assets/family-tree"
import Tree from "components/Tree"
import Header from "components/Header"
import { DataProvider, DataUpdater } from "components/DataContext"

const useStyles = makeStyles(theme => ({
    root: {
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
        gridTemplateRows: `${theme.mixins.toolbar.minHeight}px 1fr`,
    },
    header: {
        gridRow: "1",
    },
    body: {
        gridRow: "2",
        width: "100%",
        height: "100%",
        background: theme.palette.background.default,
    },
}))

export default function Home() {
    const classes = useStyles()
    return (
        <DataProvider>
            <div className={classes.root}>
                <div className={classes.header}>
                    <Header />
                </div>

                <div className={classes.body}>
                    <ZoomContainer>
                        {({ width, height, zoom }) => (
                            <>
                                <DataUpdater data={{ width, height, zoom }} />
                                <ZoomSVG
                                    width={width}
                                    height={height}
                                    zoom={zoom}
                                >
                                    <Tree
                                        width={width}
                                        height={height}
                                        data={data}
                                    />
                                </ZoomSVG>
                            </>
                        )}
                    </ZoomContainer>
                </div>
            </div>
        </DataProvider>
    )
}
