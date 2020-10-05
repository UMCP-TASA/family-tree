import React from "react"
import { AppBar, Toolbar, Grid, makeStyles } from "@material-ui/core"

import { DataContext } from "components/DataContext"
import Search from "./Search"

type Props = {}

const useStyles = makeStyles(theme => ({
    root: {
        background: theme.palette.background.paper,
    },
}))

export default function Header(props: Props) {
    const classes = useStyles()
    const { zoom, tree, width, height } = React.useContext(DataContext)

    return (
        <AppBar className={classes.root}>
            <Toolbar>
                <Grid
                    container
                    alignItems="center"
                    justify="space-between"
                    spacing={3}
                >
                    <Grid item md={3}></Grid>
                    <Grid item md={6}>
                        <Search
                            zoom={zoom}
                            tree={tree}
                            width={width}
                            height={height}
                        />
                    </Grid>

                    <Grid item md={3}>
                        <button onClick={zoom?.center}>Center</button>
                        <button onClick={zoom?.reset}>Reset</button>
                        <button onClick={zoom?.clear}>Clear</button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
