import { Box, Card, Text, Grid, CardFooter } from 'grommet'
import { Tag } from 'grommet-controls'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loadRecipe} from '../store/currentRecipe'

const defaultProps = {
    title: '',
    category: '',
    image_url: '',
    user: {
        name: ''
    }
}

export default (props = defaultProps) => {
    const { id, title, category, image_src, user: { name } } = props.recipe
    const dispatch = useDispatch()
    const currentId = useSelector(state => state.currentRecipe.id)

    return (
        <Card margin='xsmall' height='small'  width='medium' 
             alignSelf={"center"} flex={false}
            onClick={() => dispatch(loadRecipe(id))}
            background={ id === currentId ? '#fde74c' : '#fff'}
        >
            <Grid
                rows={['85%', '15%']}
                columns={['50%', '50%']}
                gap='xxsmall'
                areas={[
                    { name: 'image', start: [0, 0], end: [0, 1] },
                    { name: 'text', start: [1, 0], end: [1, 0] },
                    { name: 'tag', start: [1, 1], end: [1, 1] }
                ]}
                fill={true}
            >
                <Box
                    // width='small' 
                    height='small'
                    alignSelf='center'
                    gridArea='image'
                    background={`url(${image_src})`}
                />

                <Box gridArea='text' alignContent='center' wrap>
                    <Text weight='bold' margin='xxsmall'>{title}</Text>
                    <Text margin='xxsmall'>{`by ${name}`}</Text>
                </Box>

                <Box gridArea='tag' >
                    <Tag  alignSelf='end' pad='xsmall' size='medium' round='small' label={category} background='accent-2' />
                </Box>
            </Grid>
            <CardFooter />
        </ Card>
    )
}
