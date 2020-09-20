import React from 'react'
import { useLocation } from 'react-router-dom'
import { Grid , Box} from 'grommet'

import RecipeFeed from '../components/RecipeFeed'
import RecipeDetails from '../components/RecipeDetails'

export default function Browse() {
    const query = new URLSearchParams(useLocation().search)
    const action = {}

    if (query.get('search')) {
        action['search'] = query.get('search')
    }


    return (
            <Grid
            margin='none'
                columns={['medium', '1fr']}
                rows={['1fr']}
                gap='small'
                fill
                alignSelf='center'
                margin='none'
            >
                <RecipeFeed {...action} />
                <RecipeDetails />
            </Grid>

    )
}