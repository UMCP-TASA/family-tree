import React from "react"
import {
    Button,
    Checkbox,
    FormControlLabel,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Typography,
} from "@material-ui/core"

const STORAGE_KEY = "wip-dialog"

export default function WIP() {
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        const hideDialog = window.localStorage.getItem(STORAGE_KEY)
        if (hideDialog !== "hide") {
            setOpen(true)
        }
    }, [])

    const onClose = () => setOpen(false)

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs">
            <DialogTitle id="wip-dialog-title">
                Thanks for visiting!
            </DialogTitle>
            <DialogContent>
                <Typography gutterBottom>
                    This page is still a work in progress! If you have any
                    feedback or would like to contribute, please message Stephan
                    Loh or email us at umcptasa@gmail.com
                </Typography>
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={e => {
                                if (typeof window !== undefined) {
                                    window.localStorage.setItem(
                                        STORAGE_KEY,
                                        e.target.checked ? "hide" : "show"
                                    )
                                }
                            }}
                            name="hideDialog"
                        />
                    }
                    label="Please don't show me this again"
                />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}
