import * as createPalette from "@material-ui/core/styles/createPalette"

declare module "@material-ui/core/styles/createPalette" {
    interface PaletteOptions {
        parentNode?: PaletteColorOptions
        leafNode?: PaletteColorOptions
        link?: createPalette.PaletteColorOptions
    }

    interface Palette {
        parentNode: PaletteColor
        leafNode: PaletteColor
        link: PaletteColor
    }
}
