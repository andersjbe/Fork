import React, { useEffect, useState } from 'react'
import { Heading, Box, Carousel, Button } from 'grommet'
import { Tag } from 'grommet-controls'

import { apiUrl } from '../config'
import { Link, useHistory } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'

export default function Dashboard(props) {
    const [categories, setCategories] = useState([])
    const [featured, setFeatured] = useState([])
    const history = useHistory()

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch(`${apiUrl}/categories`)
            if (res.ok) {
                const data = await res.json()
                setCategories(data.categories)
            }
        }

        const fetchFeatured = async () => {
            const res = await fetch(`${apiUrl}/recipes/featured`)
            if (res.ok) {
                const data = await res.json()
                setFeatured(data.recipes)
            }
        }

        fetchFeatured()
        fetchCategories()
    }, [])


    return (<>
        <>
            <Heading level={1}>Welcome to Fork</Heading>

            <Heading level={2}>Featured</Heading>
            <Box width="medium">
                <Carousel fill controls={false} play={2000}>
                    {featured.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
                </Carousel>
            </Box>

            <Link to={{
                pathname: '/browse',
                query: {
                    featured: 'true'
                },
                state: {
                    featured
                }
            }}>
                <Button margin='small' secondary label='Explore our Featured Recipes' />

            </Link>

            <Heading level={3}>Categories</Heading>

            <Box direction='row' wrap justify='center'>
                {categories.map((category, i) => (
                    <Tag label={category.category} key={i}
                        margin='xsmall' size='large' round='medium'
                        pad='xsmall' background='accent-2'
                        onClick={() => history.push(`/browse?category=${category.category}`)}
                    />
                ))}
            </Box>
        </>
    </>)
}
