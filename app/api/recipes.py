from flask import Blueprint, jsonify, request

from ..models import db, Recipe, RecipeCategory

recipe_routes = Blueprint('recipes', __name__)

@recipe_routes.route('', methods=["POST"])
def post_recipe():
    # TODO upload image to s3 with boto3
    recipe_data = {
        'title': request.json.get('title')
        'description': request.json.get('description')
        'ingredients': request.json.get('ingredients')
        'instructions': request.json.get('instructions')
        'user_id': request.json.get('userId')
        'category_id': request.json.get('categoryId')
        'from_recipe_id': request.json.get('fromRecipeId')
    }

    if not recipe_data['title'] 
        or not recipe_data['ingredients'] 
        or not recipe_data['instructions'] 
        or not recipe_data['user_id']
        or not recipe_data['category_id']:

        return {'message': 'Incomplete recipe data', recipe: recipe_data}, 401

    recipe = Recipe(**recipe_data)
    db.session.add(recipe)
    db.session.commit()

    return recipe.to_details_dict()

@recipe_routes.route('/category/<int:id>', defaults={'offset': 0})
@recipe_routes.route('/category/<int:id>/<int:offset>')
def get_category_recipes(id, offset):
    # category = RecipeCategory.query.get(id)
    # recipes = category.recipes
    recipes = Recipe.query.filter(Recipe.category_id == id).offset(offset).limit(20).all()
    return ('recipes': [recipe.to_preview_dict for recipe in recipes])

@recipe_routes.route('/search/<path:term>', defaults={'offset': 0})
@recipe_routes.route('/search/<path:term>/<int:offset>')
def search_recipes(term, offset):
    recipes = Recipe.query.filter((term in Recipe.title) | 
                                (term in Recipe.description) | 
                                (term in Recipe.ingredients) |
                                (term in Recipe.instructions)).offset(offset).limit(20).all()
    return ('recipes': [recipe.to_preview_dict for recipe in recipes])


