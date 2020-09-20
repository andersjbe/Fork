import { Box, Card, CheckBox, Heading, Image, List, Paragraph } from 'grommet'
import { Avatar } from 'grommet-controls'
import { Italic } from 'grommet-icons'
import React from 'react'
import { useSelector } from 'react-redux'

export default function RecipeDetails(props) {
    const { currentRecipe } = useSelector(state => state)

    if (currentRecipe.id === null) {
        return (
            <Box fill='vertical' pad='medium' flex={false}>
                <Heading>Select a recipe</Heading>
            </Box>
        )
    }

    const { id, title, image_src, user, description, ingredients, instructions } = currentRecipe

    return (
        <Box pad='small'   flex={false} overflow='auto'  >
            <Box margin='xsmall' flex={false}>
                <Heading margin="xxsmall">{title}</Heading>
                <Avatar image={user.image_url}
                    title={user.name} />
                    
            </Box>

            <Card
                // background={`url(${image_src})`} 
                width='large'
                // height='large' 
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
                    data={ingredients.map(ing => ({ ing  }))} 
                    primaryKey='ing'
                />
            </Box>

            <Box width='large' alignSelf='center' flex={false}>
                <Heading level={3}>Instructions</Heading>
                <List
                    data={instructions.map((inst, i) => ({index: i+1, inst }) )}
                    primaryKey='index'
                    secondaryKey='inst'
                    border={false}
                />
            </Box>
        </Box>
    )

}