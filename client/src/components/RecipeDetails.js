import { Box, Button, Card, Carousel, CheckBox, Grid, Heading, Image, List, Paragraph, Text } from 'grommet'
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

    const { id, forks, from_recipe, title, image_src, user, description, ingredients, instructions } = currentRecipe

    return (
        <Box pad='small' flex={false} overflow='auto'  >
            <Box margin='xsmall' flex={false} align='center'>
                <Heading margin="xxsmall">{title}</Heading>

                <Grid gap='large' columns={['2fr', '1fr', '1fr']} rows={['1fr']} width='100%'>
                    <Avatar image={user.image_url}
                        title={user.name} />
                    <Box />
                    <Link to={`/create-recipe?fork=${id}`} >
                        <Button label='Fork' primary margin='xsmall' alignSelf='end' />
                    </Link>
                </Grid>

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

            <Box width='large' alignSelf='center' flex={false} alignContent='start'>
                <Heading level={3}>Instructions</Heading>
                <List
                    alignSelf='center'
                    data={instructions.map((inst, i) => ({ index: i + 1, inst }))}
                    primaryKey='index'
                    secondaryKey='inst'
                    border={false}
                    children={(item, i) => {
                        if (item.inst) {
                            return <Text>{item.inst}</Text>
                        }
                    }}
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

            {
                forks.length > 0 ?
                    <Box flex={false} >
                        <Heading level={3}>Forks:</Heading>
                        <Carousel >
                            {
                                forks.map(fork => <RecipeCard recipe={{ ...fork }} />)
                            }
                        </Carousel>

                    </Box>
                    : null
            }
        </Box>
    )

}