import { convertMealDbObj } from '../utils'

export const searchAPI = term => async dispatch => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)

    if(!res.ok) {
        console.log(res)
    } else {
        const { meals } = await res.json()
        const recipes = meals.map(meal => convertMealDbObj(meal))
        dispatch(setRecipes(recipes))
    }
}

const SET_API_RECIPES = 'fork/mealDb/SET_API_RECIPES'

const setRecipes = recipes => ({
    type: SET_API_RECIPES,
    recipes
})

export default function reducer(state={}, action) {
    switch (action.type) {
        case SET_API_RECIPES:
            return { recipes: action.recipes, ...state }
    
        default:
            return {...state};
    }
}