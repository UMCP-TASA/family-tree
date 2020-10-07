import React from "react"
import { Container, Typography, makeStyles } from "@material-ui/core"
import { useTooltip, TooltipWithBounds, defaultStyles } from "@visx/tooltip"
import { localPoint } from "@visx/event"

import { DataProvider, DataUpdater } from "components/DataContext"
import { ZoomContainer, ZoomSVG } from "components/Zoom"
//import data from "assets/family-tree"
import Tree, { NodeType } from "components/Tree"
import Header from "components/Header"
import { WIP } from "components/Modals"
import SEO from "components/Seo"

import data from "../assets/familyTree.json"

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
        position: "relative",
        background: theme.palette.background.default,
    },
}))

type TooltipData = {
    name: string
    year: string
    positions: string[]
    familySize: number
}

export default function Home() {
    const classes = useStyles()
    const {
        tooltipData,
        tooltipLeft = 0,
        tooltipTop = 0,
        tooltipOpen,
        showTooltip,
        hideTooltip,
    } = useTooltip<TooltipData>()

    const handleMouseOver = React.useCallback(
        (node: NodeType) => (e: React.MouseEvent) => {
            const { year, positions, familySize } = node.data.attributes
            const coords = localPoint(e) || { x: 0, y: 0 }
            showTooltip({
                tooltipLeft: coords.x,
                tooltipTop: coords.y,
                tooltipData: {
                    name: node.data.name,
                    year,
                    positions,
                    familySize,
                },
            })
        },
        [showTooltip]
    )

    return (
        <DataProvider>
            <SEO title="TASA Family Tree" description="UMCP TASA Family Tree" />
            <WIP />
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
                                        handleMouseOver={handleMouseOver}
                                        hideTooltip={hideTooltip}
                                    />
                                </ZoomSVG>
                            </>
                        )}
                    </ZoomContainer>
                    {tooltipOpen && tooltipData && (
                        <TooltipWithBounds
                            key={Math.random()}
                            top={tooltipTop}
                            left={tooltipLeft}
                            style={{
                                ...defaultStyles,
                            }}
                        >
                            <Container maxWidth="xs">
                                <Typography variant="h6" align="center">
                                    {tooltipData.name}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    align="center"
                                    gutterBottom
                                >
                                    {tooltipData.year}
                                </Typography>

                                {tooltipData.positions.length > 0 &&
                                    tooltipData.positions[0] !== "" && (
                                        <Typography>
                                            Positions:{" "}
                                            {tooltipData.positions.join(", ")}
                                        </Typography>
                                    )}

                                <Typography>
                                    Family size: {tooltipData.familySize}
                                </Typography>
                            </Container>
                        </TooltipWithBounds>
                    )}
                </div>
            </div>
        </DataProvider>
    )
}
