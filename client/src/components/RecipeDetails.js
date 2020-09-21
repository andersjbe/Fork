import { Box, Button, Card, CheckBox, Heading, Image, List, Paragraph } from 'grommet'
import { Avatar } from 'grommet-controls'
import { Italic } from 'grommet-icons'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import RecipeCard from './RecipeCard'

export default function RecipeDetails(props) {
    const { currentRecipe } = useSelector(state => state)

    if (currentRecipe.id === null) {
        return (
            <Box fill='vertical' pad='medium' flex={false}>
                <Heading>Select a recipe</Heading>
            </Box>
        )
    }

    const { id, from_recipe, title, image_src, user, description, ingredients, instructions } = currentRecipe

    return (
        <Box pad='small' flex={false} overflow='auto'  >
            <Box margin='xsmall' flex={false}>
                <Heading margin="xxsmall">{title}</Heading>
                <Avatar image={user.image_url}
                    title={user.name} />
                <Link to={`/create-recipe?fork=${id}`} >
                    <Button label='Fork' primary margin='xsmall' />
                </Link>

            </Box>


            <Card
                width='large'
                margin='xsmall'
                alignSelf='center'
                flex={false}
            >
                <Image
                    src={image_src}
                    fill
                    fit='contain'
                />
            </Card>

            <Box alignSelf='center' flex={false} width='large'>
                <Paragraph alignSelf='center' fill pad='small'>{description}</Paragraph>
            </Box>

            <Box width='medium' alignSelf='center' flex={false}>
                <Heading level={3}>Ingredients</Heading>
                <List
                    data={ingredients.map(ing => ({ ing }))}
                    primaryKey='ing'
                />
            </Box>

            <Box width='large' alignSelf='center' flex={false}>
                <Heading level={3}>Instructions</Heading>
                <List
                    data={instructions.map((inst, i) => ({ index: i + 1, inst }))}
                    primaryKey='index'
                    secondaryKey='inst'
                    border={false}
                />
            </Box>

            {
                from_recipe.id ?
                    <Box flex={false}>
                        <Heading level={3}>Forked From:</Heading>
                        <RecipeCard recipe={{ ...from_recipe }} />
                    </Box>
                    : null
            }
        </Box>
    )

}