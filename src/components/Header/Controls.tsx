import React from "react"
import {
    Grid,
    Button,
    IconButton,
    TextField,
    makeStyles,
} from "@material-ui/core"
import { ZoomIn, ZoomOut } from "@material-ui/icons"

import { DataContext } from "components/DataContext"

type Props = {}

const useStyles = makeStyles(theme => ({
    input: {
        textAlign: "center",
    }
}))

const isValid = (value: number) => value >= 50 && value <= 400

export default function Controls(props: Props) {
    const { zoom } = React.useContext(DataContext)
    const classes = useStyles()

    const [displayedZoom, setDisplayed] = React.useState(100)
    const scale = zoom ? zoom.transformMatrix.scaleX : 1

    React.useEffect(() => {
        if (zoom) setDisplayed(Math.ceil(zoom.transformMatrix.scaleX * 100))
    }, [zoom])

    return (
        <Grid container alignItems="center" justify="center">
            <Grid item>
                <IconButton
                    aria-label="zoom-out"
                    onClick={() => {
                        zoom?.scale({
                            scaleX: 0.9,
                            scaleY: 0.9,
                        })
                    }}
                >
                    <ZoomOut />
                </IconButton>
            </Grid>
            <Grid item xs={3}>
                <TextField
                    id="zoom-field"
                    label="Zoom"
                    variant="outlined"
                    size="small"
                    margin="dense"
                    type="number"
                    value={displayedZoom}
                    error={!isValid(displayedZoom)}
                    helperText={
                        isValid(displayedZoom)
                            ? ""
                            : "50 < x < 400"
                    }
                    inputProps={{
                        className: classes.input
                    }}
                    onChange={e => {
                        const newScale = Number.parseInt(e.target.value)
                        setDisplayed(newScale)

                        if (isValid(newScale)) {
                            const scaleDifference = newScale / 100 / scale
                            zoom?.scale({
                                scaleX: scaleDifference,
                                scaleY: scaleDifference,
                            })
                        }
                    }}
                />
                {/* <Slider
                    min={50}
                    max={400}
                    color="secondary"
                    value={scale * 100}
                    getAriaValueText={valueLabelFormat}
                    getAriaLabel={valueLabelFormat}
                    valueLabelFormat={valueLabelFormat}
                    valueLabelDisplay="on"
                    onChange={(__, newScale) => {
                        const scaleDifference =
                            (newScale as number) / 100 / scale
                        zoom?.scale({
                            scaleX: scaleDifference,
                            scaleY: scaleDifference,
                        })
                    }}
                /> */}
            </Grid>
            <Grid item>
                <IconButton
                    aria-label="zoom-in"
                    onClick={() => {
                        zoom?.scale({
                            scaleX: 1.1,
                            scaleY: 1.1,
                        })
                    }}
                >
                    <ZoomIn />
                </IconButton>
            </Grid>
            <Grid item>
                <Button onClick={zoom?.center}>Center</Button>
            </Grid>
        </Grid>
    )
}
