import { Box, Card, CardHeader, CardBody, Text, Image, Grid, CardFooter } from 'grommet'
import { Tag } from 'grommet-controls'
import React from 'react'

const defaultProps = {
    title: '',
    category: '',
    image_url: '',
    user: {
        name: ''
    }
}

export default (props = defaultProps) => {
    const { title, category, image_src, user: { name } } = props.recipe

    return (
        <Card margin='xdocksmall' height='small' width='medium' background='#fff'>
            <Grid
                rows={['85%', '15%']}
                columns={['small', 'small']}
                gap='xxsmall'
                areas={[
                    { name: 'image', start: [0, 0], end: [0, 1] },
                    { name: 'text', start: [1, 0], end: [1, 0] },
                    { name: 'tag', start: [1, 1], end: [1, 1] }
                ]}
                fill={true}
            >
                <Box
                    width='small' height='small'
                    alignSelf='center'
                    gridArea='image'
                    background={`url(${image_src})`}
                />

                <Box gridArea='text' alignContent='center' wrap>
                    <Text weight='bold' margin='xxsmall'>{title}</Text>
                    <Text margin='xxsmall'>{`by ${name}`}</Text>
                </Box>

                <Box gridArea='tag'>
                    <Tag alignSelf='end' pad='small' size='medium' round='small' label={category} background='accent-2' />
                </Box>
            </Grid>
            <CardFooter />
        </ Card>
    )
}

{/* <Grid
    rows={['xxsmall', 'xxsmall', 'xxsmall']}
    columns={['xsmall', 'small']}
    gap='small'
    areas={[
        { name: 'image', start: [0, 0], end: [0, 2] }
        { name: 'title', start: [1, 0], end: [1, 0] }
        { name: 'author', start: [1, 1], end: [1, 1] }
        { name: 'tag', start: [1, 2], end [1, 2]}
    ]}
>

</Grid> */}