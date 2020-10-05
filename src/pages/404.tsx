import React from "react"
import { makeStyles, Typography } from "@material-ui/core"
import Button from "components/Button"

const useStyles = makeStyles(theme => ({
    root: {
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
    },
    link: {

    }
}))

export default function NotFoundPage() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Typography variant="h1" align="center">
                Oops page couldn't be found
            </Typography>
            <Button to="/">Return to Family Tree</Button>
        </div>
    )
}
