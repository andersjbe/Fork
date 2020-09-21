import { Grid, Main } from 'grommet'
import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import CreateRecipeForm from '../components/CreateRecipeForm'
import Navbar from '../components/Navbar'

export default function CreateRecipe(props) {
    
    return (
        <>
            <CreateRecipeForm />
        </>
    )
}
