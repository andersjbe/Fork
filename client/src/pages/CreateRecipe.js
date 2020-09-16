import { Grid } from 'grommet'
import React from 'react'

import CreateRecipeForm from '../components/CreateRecipeForm'
import Navbar from '../components/Navbar'

export default function CreateRecipe() {
    return (
        <Grid
            columns={['10%', '90$']}
            rows={['100%']}
        >
            <Navbar />
            <div
                style={{ margin: '20px 10px', display: 'flex', justifyContent: 'space-around' }}
            >
                <CreateRecipeForm />
            </div>
        </Grid>
    )
}