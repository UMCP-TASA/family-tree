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

# Updating the Family Tree

-   You will need to login as UMCP TASA or get access to the file in the Family Tree folder
-   Family tree information is stored at: https://docs.google.com/spreadsheets/d/1NZM7qljnp6zryL-H3C5VzEU28Gz9cWAs-SMslCu0LCY/edit?usp=sharing
-   Files for generating the family tree json file are stored at: [`scripts/](scripts/)
-   JSON file containing family tree information stored at: [`src/assets/json/familyTree.json`](src/assets/json/familyTree.json)

## Editing the Google Sheet

Adding people:

1. Add row containing
    1. Name
    2. Year
    3. Board Positions (if applicable)
    4. Big
2. Copy the formulas for **Generation** and **Littles** from another cell
    1. Be sure to fill these cells out otherwise the references for other cells may go wack
3. Generation and littles will auto-update
    1. Generation is big's generation + 1
    2. Littles is all people who have the current person listed as a big
4. Be sure to sort the Person/Name column by alphabetical order for the script to work correctly!

## Generating a new JSON File

After updating the family tree, you can generate a new JSON file using the script [script/gen_family_json.py](familytree/gen_family_json.py).


1. Install [python3](https://docs.python-guide.org/starting/install3/linux/) 
1. Install [Google Sheets Python API](https://developers.google.com/sheets/api/quickstart/python) and [JSONPickle](http://jsonpickle.github.io/index.html) by running

```
pip install --upgrade google-api-python-client google-auth-httplib2 google-auth-oauthlib -U jsonpickle
```

2. Make sure you have [`credentials.json`](#getting-credentials)
    1. You can download it from the Family Tree folder in the drive
    2. Place the `credentials.json` file in the `scripts/` folder
    3. Note that this file and the generated token.pickle files are ignored in [.gitignore](.gitignore) so that we don't expose our secret credentials to the world!
3. Make sure the parameters in [scripts/gen_family_json.py](familytree/gen_family_json.py) are correct
    1. `SPREADSHEET_ID`: Spreadsheet ID for the sheet. More info [here](https://developers.google.com/sheets/api/guides/concepts#spreadsheet_id)
    2. `RANGE_NAME`: Range of cells containing our data. Will need to change if adding people or columns. More info about ranges [here](https://developers.google.com/sheets/api/guides/concepts#a1_notation)
    3. Various indexes for the columns in the sheet
    4. `JSON_PATH`: Path where the `familytree.json` file will be generated to
4. `cd` into the [`scripts`](scripts/) folder
5. Run `python3 gen_family_json.py`
6. If this is your first time running, you'll be redirected to a login. Sign in with TASA email or an email that has view permissions of the sheet
7. File should be generated!

Note: Due to how flags and data passing work, you might not be able to run this script in the Bash subsystem for windows if your folder is in the Window file system. To fix this, either run the script in Command Prompt or move your project folder into your Unix subsystem's file directory.

Look at this [GitHub issue on hot reloading](https://github.com/microsoft/WSL/issues/4417) for more info 

## Getting Credentials

Since we don't want to publish our secret key for the Sheets API, you'll have to download it and copy it as `credentials.json` into [familytree/credentials.json](familytree/credentials.json). Get the file from our TASA drive. Details to generate it can be found at the Google Sheets API quickstart page: https://developers.google.com/sheets/api/quickstart/python

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
