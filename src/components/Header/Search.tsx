import React from "react"
import {
    makeStyles,
    Paper,
    Popper,
    ClickAwayListener,
    Grow,
    MenuList,
    MenuItem,
    TextField,
} from "@material-ui/core"
import { DataContext } from "components/DataContext"
import { NodeType } from "components/Tree"
import { findNodeFromName } from "@utils"

type Props = {}

const useStyles = makeStyles(theme => ({
    menuItem: {
        textAlign: "center",
        justifyContent: "center",
    },
}))

export default function Search(props: Props) {
    const { zoom, tree, width = 10, height = 10 } = React.useContext(
        DataContext
    )
    const classes = useStyles()
    // const [focusedNode, setFocusedNode] = React.useState<NodeType>()

    const [open, setOpen] = React.useState(false)
    const [foundNodes, setFoundNodes] = React.useState<NodeType[]>([])
    const anchorRef = React.useRef<HTMLInputElement>(null)

    const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
        // @ts-ignore
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return
        }

        setOpen(false)
    }

    const handleListKeyDown = (event: React.KeyboardEvent) => {
        if (event.key == "Tab") {
            event.preventDefault()
            setOpen(false)
        }
    }

    const prevOpen = React.useRef(open)
    React.useEffect(() => {
        if (prevOpen.current && !open && anchorRef.current) {
            anchorRef.current.focus()
        }

        prevOpen.current = open
    }, [open])

    return (
        <>
            <TextField
                id="search-field"
                label="Search"
                color="secondary"
                variant="outlined"
                margin="dense"
                autoComplete="off"
                fullWidth
                aria-haspopup
                ref={anchorRef}
                onChange={e => {
                    const nameToFind = e.target.value
                    if (nameToFind && nameToFind !== "" && tree && zoom) {
                        const matches = findNodeFromName(nameToFind, tree)
                        setFoundNodes(matches)
                        setOpen(matches.length > 0)
                    } else {
                        setFoundNodes([])
                        setOpen(false)
                    }
                }}
                onFocus={() => {
                    setOpen(foundNodes.length > 0)
                }}
            />
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === "bottom"
                                    ? "center top"
                                    : "center bottom",
                        }}
                    >
                        <Paper
                            style={{
                                width: anchorRef.current?.offsetWidth,
                            }}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    id="search-list-grow"
                                    onKeyDown={handleListKeyDown}
                                >
                                    {foundNodes.map(node => (
                                        <MenuItem
                                            className={classes.menuItem}
                                            alignItems="center"
                                            key={node.data.attributes.id}
                                            onClick={() => {
                                                if (!tree || !zoom) return
                                                // node.data.isFocused = true
                                                // setFocusedNode(node)

                                                const inverseCentroid = zoom.applyInverseToPoint(
                                                    {
                                                        x: width / 2,
                                                        y: height / 2,
                                                    }
                                                )

                                                zoom.translate({
                                                    translateX:
                                                        inverseCentroid.x -
                                                        node.y,
                                                    translateY:
                                                        inverseCentroid.y -
                                                        node.x,
                                                })
                                            }}
                                        >
                                            {node.data.name}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    )
}
