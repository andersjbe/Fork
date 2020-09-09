## Components

- Use grommet component library
- Use a sidebar for general navigation0 like dashboard, settings, search, etc.
- There will be a top bar that will 
- Maybe create a dashboard view? Something to display collections, maybe promote a recipe
- Browsing through recipes will have a feed which will use an infitescroll to browse through the results 
  - The currently selected recipe will show up on the right
- Form for creating / forking recipes probably make it multipage
  - Need to find a way to show new input boxes one after another for ingredients and instructions
- There will be a collections overview page, as well as links to each collection in the sidebar navigation
  - Also a new collection form
- Each recipe page will include:
  - The recipe's title, image, description, ingredients and instructions
  - Buttons to add the recipe to one of the current user's collections
  - If the recipe has any notes, it will list the note and its author's avatar and name
  - It will always have an add a note form
  - It will list the recipes that were forked from the current one

## Redux store

- The redux store will focus on keeping track of current information- the current user, the current list of recipes, the current recipe in the details view

## Styles

- Color Pallette
  - `#7FB800` for navbars, primary color
  - `#FFB400` for highlighting, secondary color
  - `#F6511D` for actions, use sparingly
  - `#E9E9ED` (& its shades) for general backgrounds, as well as text against dark backgrounds
  - `#0D1F22` for text against light backgrounds, and maybe small borders and box shadows?
- Typography
  - Poppins from google fonts
  - Maybe add one more later on