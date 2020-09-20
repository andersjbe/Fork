import { Grid, Main } from 'grommet'
import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import CreateRecipeForm from '../components/CreateRecipeForm'
import Navbar from '../components/Navbar'

export default function CreateRecipe(props) {
    const forkedRecipe = {
        title: "",
        description: "",
        ingredients: ['', '', '', '', ''],
        instructions: ['', '', ''],
        image_src: "",
        category: { category: 'Asian', id: 1 }
    }

    // const { currentRecipe } = useSelector(state => state)

    // if(URLSearchParams(useLocation().search.forked === "true" && currentRecipe.id !== null)) {
    //     forkedRecipe = currentRecipe;
    // }

    return (
        <>
            <CreateRecipeForm forkedRecipe={forkedRecipe} />
        </>
    )
}

CreateRecipe.defaultProps = {
    forkedRecipe: {
        title: "",
        description: "",
        ingredients: ['', '', '', '', ''],
        instructions: ['', '', ''],
        image_src: "",
        category: { category: 'Asian', id: 1 }
    }
}