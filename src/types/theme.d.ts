import * as createPalette from "@material-ui/core/styles/createPalette"

export type TreeColors =  {
    linkStroke: React.CSSProperties["stroke"],
    parentFill: React.CSSProperties["fill"],
    parentStroke: React.CSSProperties["stroke"],
}

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
      treeColors: TreeColors
    }
    // allow configuration using `createMuiTheme`
    interface ThemeOptions {
      treeColors: TreeColors
    }
  }