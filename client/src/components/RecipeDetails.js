import { 
    Box, Button, Card, Carousel, Grid, Heading, Image, List, Paragraph, Text 
} from 'grommet'
import { Avatar } from 'grommet-controls'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import RecipeCard from './RecipeCard'
import RecipeNotes from './RecipeNotes'

export default function RecipeDetails(props) {
    const { currentRecipe } = useSelector(state => state)

    if (currentRecipe.id === null) {
        return (
            <Box fill='vertical' pad='medium' flex={false}>
                <Heading>Select a recipe</Heading>
            </Box>
        )
    }

    const { id, notes, forks, from_recipe, title, image_src, user, description, ingredients, instructions } = currentRecipe

    return (
        <Box pad='xsmall' flex={false} overflow='auto' >
            <Box border='bottom' fill='horizontal' margin='xsmall' flex={false} align='center' background='background'
                style={{ position: 'sticky', top: -12 }} pad='small' width='xlarge' alignSelf='center'>
                <Heading margin="xxsmall">{title}</Heading>

                <Grid gap='large' columns={['2fr', '1fr', '1fr']} rows={['1fr']} width='100%'>
                    <Link to={`/browse?user=${user.id}`}>
                        <Avatar image={user.image_url}
                            title={user.name} />
                    </Link>

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

            <Box width='80%' alignSelf='center'>

                <Box alignSelf='center' flex={false} width='large'>
                    <Paragraph alignSelf='center' fill pad='small'>{description}</Paragraph>
                </Box>

                <Heading alignSelf='start' level={3}>Ingredients</Heading>
                <Box width='medium' alignSelf='center' flex={false}>
                    <List
                        data={ingredients.map(ing => ({ ing }))}
                        primaryKey='ing'
                    />
                </Box>

                <Heading alignSelf='stretch' level={3}>Instructions</Heading>
                <Box width='large' alignSelf='center' flex={false} alignContent='start'>
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

                <RecipeNotes recipeId={id} notes={notes} />

                {
                    from_recipe.id ?
                        <><Heading level={3}>Forked From:</Heading>
                            <Box flex={false}>
                                <RecipeCard recipe={{ ...from_recipe }} />
                            </Box></>
                        : null
                }

                {
                    forks.length > 0 ?
                        <Box flex={false} >
                            <Heading level={3}>Forks:</Heading>
                            <Box direction='row' overflow={{horizontal: 'scroll'}} >
                                {
                                    forks.map(fork => <RecipeCard recipe={{ ...fork }} />)
                                }
                            </Box>

                        </Box>
                        : null
                }
            </Box>
        </Box>
    )

}