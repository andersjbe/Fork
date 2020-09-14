import { Box, InfiniteScroll } from 'grommet';
import React, { useEffect, useState } from 'react'

import { apiUrl } from '../config'
import RecipeCard from './RecipeCard'

const RecipeFeed = props => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [recipes, setRecipes] = useState([]);
    const [hasMore, setHasMore] = useState(true)

    useEffect(async () => {
        try {
            let res = null;
            if ('search' in props && typeof props['search'] === 'string') {
                res = await fetch(`${apiUrl}/recipes/search?term=${props['search']}`)
            } else if ('category' in props && typeof props['category'] === 'string') {
                res = await fetch(`${apiUrl}/recipes/${props['category']}`)
            }
    
            if (res && res.ok) {
                const data = await res.json()
                setRecipes(data.recipes)
                setCurrentIndex(data.recipes.length)
                if (data.recipes.length < 20) {
                    setHasMore(false)
                }
            } else if (!res.ok) {
                throw res
            }
        } catch(e) {
            setRecipes([]);
            console.log(res)
        }
    })

    const loadMore = () => {
        if(!hasMore) {
            return
        }

        try {
            let res = null;
            if ('search' in props && typeof props['search'] === 'string') {
                res = await fetch(`${apiUrl}/recipes/search?term=${props['search']}&offset=${currentIndex}`)
            } else if ('category' in props && typeof props['category'] === 'string') {
                res = await fetch(`${apiUrl}/recipes/${props['category']}?offset=${currentIndex}`)
            }
    
            if (res && res.ok) {
                data = await res.json()
                setRecipes([...recipes, ...data.recipes])
                setCurrentIndex(recipes.length)
                if (data.recipes.length < 20) {
                    setHasMore(false)
                }
            } else if (!res.ok) {
                throw res
            }
        } catch(e) {
            console.log(res)
        }
    }

    return (
        <Box pad='small' fill='vertical' width='medium'>
            <InfiniteScroll items={recipes} onMore={loadMore}>
                {item => (
                    <RecipeCard recipe={item} />
                )}
            </InfiniteScroll>
        </Box>
    )

}

export default RecipeFeed