import { Grid, Main } from 'grommet'
import React from 'react'

import CreateRecipeForm from '../components/CreateRecipeForm'
import Navbar from '../components/Navbar'

export default function CreateRecipe() {
    return (
        <>
            <Navbar />
            <Main align='center' margin='small'>
                <CreateRecipeForm />

            </Main>

        </>
    )
}