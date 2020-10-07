import React from "react"
import { makeStyles, Typography } from "@material-ui/core"
import Button from "components/Button"
import SEO from "components/Seo"

const useStyles = makeStyles(theme => ({
    root: {
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
    },
}))

export default function NotFoundPage() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <SEO title="Page not found | Family Tree" description="UMCP TASA Family Tree"/>
            <Typography variant="h1" align="center">
                Oops page couldn't be found
            </Typography>
            <Button to="/">Return to Family Tree</Button>
        </div>
    )
}
