# Family Tree

A family tree for UMCP TASA written in React with Gatsby.

# Installation

Everything is already set-up in the [package.json](package.json) so all you have to do is

```
npm install
```

Note that because of [this issue](https://github.com/pmndrs/react-spring/issues/1078) with react-spring, we currently have to manually patch the react-spring packages. Luckily with the use of the `patch-packages` package, this has already been done for you via the `postinstall` command.

## Gatsby

You will have to install gatsby-cli which you can do with `npm install -g gatsby-cli`
Their website has a nice [tutorial](https://www.gatsbyjs.org/tutorial/) which I recommend following.

You also can find the original [Gatsby's original README.md here](https://github.com/gatsbyjs/gatsby-starter-hello-world). That doc details a quick look at some file structure and basic files for this repo

# Wonky Data Passing

Because we have to get data (in particular the zoom controller, width, height, and tree itself) from the tree in order to have working controls in the header, I implemented a sort of confusing way of passing data. It makes use of the [React Context API](https://reactjs.org/docs/context.html) with a Provider, Consumer, and Updated component. The [Provider](src/components/DataContext/Provider.tsx) component handles the logic of storing and providing setters for the raw data. The [Updater](src/components/DataContext/Updater.tsx) is a component that doesn't actually render anything to the DOM but takes values and uses the setters from the Provider component to update the raw values. Note that it does this in a `useEffect` hook so it's only done on initial mount and not during each render which would result in an infinite loop of setting and updating. Finally, components can either use the [Consumer](src/components/DataContext/Consumer.tsx) component or use the `useContext` hook to get the data.

## Why do this?

-   Avoid passing data through every component in between the provider and the component that actually needs it
    -   Less things to change in the code when you decide to add new data!
    -   Means only the component that needs it re-renders when data changes instead of every component in the DOM tree
-   Allows our header to be outside of the [ParentSize/Zoom](src/components/Zoom/Container.tsx) container and not have to rely on absolute positioning to get it in the right place

# Animations

This site use [react-spring](https://www.react-spring.io/) for animations. In order to fix some issues with typing, I upgraded to the 9.0.0-rc.3 version of react-spring. This means that some of the docs on the main page are outdated. Instead, refer to the [react-spring v9 docs](https://aleclarson.github.io/react-spring/v9/).

The animations are inspired and taken from the [tree example](https://github.com/pmndrs/react-spring-examples/tree/renderprops/demos/renderprops/tree) on the official docs. I modified it to use hooks with version 9 of react-spring.

In particular, we use the `useTransition` hook to handle entering, updating, and leaving for nodes and links. Because of some wonkiness with LinkHorizontal from @visx/shape, we couldn't easily use that with react-spring. As a result, I created my own Link component with an SVG bezier curve path. Uhh it's pretty ugly so any help making that look nicer would be appreciated.

# Tree

First we use a combination of `withParentSize` from [@visx/responsive](https://vx-demo.now.sh/docs/responsive) and `Zoom` from [@visx/zoom](https://vx-demo.now.sh/docs/zoom) in our [`ZoomContainer`](src/components/Zoom/Container.tsx) component. This component re-sizes based on the available space and provides an interface for zooming and panning.

Our tree uses [@visx/hierarchy](https://vx-demo.now.sh/docs/hierarchy) to render. The Tree component provided from @visx/hierarchy handles the positioning of nodes. We pass it our own [`Nodes`](src/components/Tree/Nodes.tsx) and [`Links`](src/components/Tree/Links.tsx) components.

The [`Nodes`](src/components/Tree/Nodes.tsx) component handles the animations and passes the positioning to each individual [`Node`](src/components/Tree/Node.tsx) component. That component handles what the root, parent, and leaf nodes actually look like.

# Things to Work On

-   [ ] Add more visual way of modifying the tree instead of via the Google Sheet
-   [ ] Add vertical orientation
-   [ ] Improve mobile support
-   [ ] Fix overlapping nodes
-   [ ] Add dark/light theme
-   [ ] Better connector curves
-   [ ] Add highlighting/visual change when nodes are found via search
    -   Need a way to re-trigger a forced tree update
-   [ ] Allow search to find nodes that aren't currently expanded and expand them
    -   Perhaps make use of the fact that nodes can still be reached via `node.data.children` and set isExpanded manually
    -   Make use of a forced tree update
