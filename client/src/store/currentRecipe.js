import { apiUrl } from '../config'

export const loadRecipe = recipeId => async (dispatch, getState) => {
    if (getState().currentRecipe.id === recipeId) {
        return
    }
    try {
        const res = await fetch(`${apiUrl}/recipes/${recipeId}`)

        if (res.ok) {
            const data = await res.json()
            data.ingredients = data.ingredients.split(' | ')
            data.instructions = data.instructions.split('\r\n')
            dispatch(setRecipe(data))
        } else {
            throw res
        }
    } catch (e) {
        // const errData = await e.json()
    }
}

const SET_RECIPE = 'fork/currentRecipe/SET_RECIPE'

const setRecipe = (data) => ({
    type: SET_RECIPE,
    data
})

export default function reducer(state={id: null}, action) {
    switch (action.type) {
        case SET_RECIPE:
            return { ...action.data };
        default:
            return { ...state };
    }
}