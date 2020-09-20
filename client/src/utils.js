export function convertMealDbObj(obj) {
    const instructions = obj.strInstructions.split('\r\n')
    
    const ingredients = []
    for(let i = 1; i<=20; i++) {
        ingredients.push(`${obj[`strMeasure${i}`]} ${obj[`strIngredient${i}`]}`)
    }
    ingredients = ingredients.filter(' ')

    return {
        id: `mealDB:${obj.id}`,
        title: obj.strMeal,
        category: obj.strCategory,
        ingredients,
        instructions,
        user: {
            name: 'Meal DB',
            image_url: 'https://www.themealdb.com/images/meal-icon.png'
        }
    }
}