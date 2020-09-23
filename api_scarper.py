from app.models import User, RecipeCategory, Recipe
from app import app, db
from dotenv import load_dotenv
import requests

load_dotenv()


def convert_api_obj(obj):
    ingredients = []

    for i in range(1, 21):
        if obj[f'strIngredient{i}'] != '':
            ingredients.append(
                f"{obj[f'strMeasure{i}']} {obj[f'strIngredient{i}']}")

    ingredients = ' | '.join(ingredients)

    category = RecipeCategory.query.filter(
        RecipeCategory.category == obj['strCategory']).first()

    category_id = 10
    if category != None:
        category_id = category.id

    recipeData = {
        'title': obj['strMeal'],
        'ingredients': ingredients,
        'instructions': obj['strInstructions'],
        'image_src': obj['strMealThumb'],
        'category_id': category_id,
        'from_url': obj['strYoutube'],
        'user_id': 2
    }

    print(recipeData)

    recipe = Recipe(**recipeData)
    db.session.add(recipe)

alphabet = 'abcdefghjklmnopqrstuvwxyz'


with app.app_context():
    for letter in alphabet:
        r = requests.get(
            'https://www.themealdb.com/api/json/v2/9973533/search.php', params={'f': letter})
        data = r.json().get('meals')
        if data != None:
            for meal in data:
                convert_api_obj(meal)
        
    db.session.commit()



# for letter in alphabet:

