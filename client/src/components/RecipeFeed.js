import { Box, InfiniteScroll } from 'grommet';
import React, { useEffect, useState } from 'react'

import { apiUrl } from '../config'
import RecipeCard from './RecipeCard'
import { searchAPI } from '../store/mealDb'

const RecipeFeed = props => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [recipes, setRecipes] = useState([]);
    const [hasMore, setHasMore] = useState(false)


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
    }, [])

    const loadMore = () => {
        const fetchMore = async () => {
            if (!hasMore) {
                return
            }

            let res = null;
            try {
                if ('search' in props && typeof props['search'] === 'string') {
                    res = await fetch(`${apiUrl}/recipes/search?term=${props['search']}&offset=${currentIndex}`)
                } else if ('category' in props && typeof props['category'] === 'string') {
                    res = await fetch(`${apiUrl}/recipes/${props['category']}?offset=${currentIndex}`)
                }

                if (res && res.ok) {
                    const data = await res.json()
                    setRecipes([...recipes, ...data.recipes])
                    setCurrentIndex(recipes.length)
                    if (data.recipes.length < 20) {
                        setHasMore(false)
                    }
                } else if (!res.ok) {
                    throw res
                }
            } catch (e) {
            }
        }

        fetchMore()

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

            <InfiniteScroll items={recipes} onMore={loadMore} step={10}>
                {item => (
                    <RecipeCard key={item.id} recipe={item} />
                )}
            </InfiniteScroll>
        </Box>
    )

}

export default RecipeFeed