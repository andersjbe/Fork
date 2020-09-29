import { Box, Button, InfiniteScroll, Text } from 'grommet';
import { Spinning } from 'grommet-controls';
import React, { useEffect, useState } from 'react'

import { apiUrl } from '../config'
import RecipeCard from './RecipeCard'

const RecipeFeed = props => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [recipes, setRecipes] = useState([]);
    const [hasMore, setHasMore] = useState(true)
    // const [loading, setLoading] = useState(false)


    useEffect(() => {
        const apiResponse = []
        const fetchRecipes = async () => {
            let res = null;
            try {
                if ('search' in props && typeof props['search'] === 'string') {
                    res = await fetch(`${apiUrl}/recipes/search?term=${props['search']}`)
                    // apiResponse = await searchAPI(props['search'])
                } else if ('category' in props && typeof props['category'] === 'string') {
                    res = await fetch(`${apiUrl}/recipes/category/${props['category']}`)
                }

                if (res && res.ok) {
                    const data = await res.json()
                    setRecipes([...data.recipes, ...apiResponse])
                    setCurrentIndex(data.recipes.length)
                    if (data.recipes.length < 20) {
                        setHasMore(false)
                    }
                } else if (!res.ok) {
                    throw res
                }
            } catch (e) {
                setRecipes([]);
            }
        }

        fetchRecipes()
    }, [props])

    const loadMore = () => {
        const fetchMore = async () => {
            console.log(hasMore)
            if (!hasMore) {
                return
            }

            let res = null;
            try {
                if ('search' in props && typeof props['search'] === 'string') {
                    res = await fetch(`${apiUrl}/recipes/search?term=${props['search']}&offset=${currentIndex}`)
                } else if ('category' in props && typeof props['category'] === 'string') {

                    res = await fetch(`${apiUrl}/recipes/category/${props['category']}?offset=${currentIndex}`)
                }

                if (res && res.ok) {
                    const data = await res.json()
                    setRecipes([...recipes, ...data.recipes])
                    setCurrentIndex(recipes.length)
                    if (data.recipes.length < 20) {
                        setHasMore(false)
                    }
                    // forceUpdate()
                } else if (!res.ok) {
                    throw res
                }
            } catch (e) {
                console.log(e)
            }
        }

        fetchMore()
    }

    if (recipes.length === 0) {
        return (
            <Box
                id='feedbox'
                width={'m%'}
                fill='vertical'
                overflow={{ vertical: 'auto' }}
                flex={false}
                alignSelf='center'
                pad='small'
            >
                <Text>No recipes found, try searching for something else</Text>
            </Box>
        )
    }

    return (
        <Box id='feedbox'
            width={'m%'}
            fill='vertical'
            overflow={{ vertical: 'auto' }}
            flex={false}
            alignSelf='center'
            pad='small'
        >
            {
                recipes.length > 0 && (<InfiniteScroll items={recipes} onMore={() => loadMore()} step={19}>
                    {(item, i) => (
                        <RecipeCard key={i} recipe={item} />
                    )}
                </InfiniteScroll>)
            }
            {hasMore ? <Button onClick={loadMore} label="Get More recipes" /> : null}
        </Box>
    )

}

export default RecipeFeed