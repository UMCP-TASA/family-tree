import React from "react"
import { AppBar, Toolbar, Grid, makeStyles } from "@material-ui/core"

import Search from "./Search"
import Controls from "./Controls"
import Logo from "components/Logo"

type Props = {}

const useStyles = makeStyles(theme => ({
    root: {
        background: theme.palette.background.paper,
    },
}))

export default function Header(props: Props) {
    const classes = useStyles()

    return (
        <AppBar className={classes.root}>
            <Toolbar>
                <Grid
                    container
                    alignItems="center"
                    justify="space-between"
                    spacing={3}
                >
                    <Grid item md={3}>
                        <a
                            href="https://umcptasa.com"
                            aria-label="Link to UMCP TASA website"
                        >
                            <Logo />
                        </a>
                    </Grid>
                    <Grid item md={6}>
                        <Search />
                    </Grid>

                    <Grid item md={3}>
                        <Controls />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
