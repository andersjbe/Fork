from flask import Blueprint, jsonify, request

from ..models import db, Recipe, RecipeCategory

recipe_routes = Blueprint('recipes', __name__)


@recipe_routes.route('', methods=["POST"])
def post_recipe():
    # TODO upload image to s3 with boto3
    recipe_data = {
        'title': request.json.get('title'),
        'description': request.json.get('description'),
        'ingredients': request.json.get('ingredients'),
        'instructions': request.json.get('instructions'),
        'user_id': request.json.get('userId'),
        'category_id': request.json.get('categoryId'),
        'from_recipe_id': request.json.get('fromRecipeId'),
        'image_url':  'https://lh3.googleusercontent.com/proxy/IYe0Jq1BK-pGLIApV-7VDbsd5qrvLjWrM_GQLUmJHFKcs4clnxxaOH2lzzjSAcSBK8Dc83Cf8T-LefvIB7P_3-_avDgafgxcU31ddvZXh9uCLm1R5cMKlvQ'
    }

    if (not recipe_data['title']) or (not recipe_data['ingredients']) or (not recipe_data['instructions']) or (not recipe_data['user_id']) or (not recipe_data['category_id']):
        return {'message': 'Incomplete recipe data', 'recipe': recipe_data}, 401

    recipe = Recipe(**recipe_data)
    db.session.add(recipe)
    db.session.commit()

    return recipe.to_details_dict()


@recipe_routes.route('/category/<path:name>')
def get_category_recipes(name):
    offset = request.args.get('offset') if 'offset' in request.args else 0
    category = RecipeCategory.query.filter(
        RecipeCategory.category == name).first()
    if category == None:
        return {'Category does not exist'}, 404
    recipes = category.recipes[offset:offset+20]
    return {'recipes': [recipe.to_preview_dict() for recipe in recipes]}


@recipe_routes.route('/search')
def search_recipes():
    term = request.args.get('term')
    offset = request.args.get('offset') if 'offset' in request.args else 0
    recipes = Recipe.query.filter((Recipe.title.ilike(f'%{term}%')) |
                                  (Recipe.description.ilike(f'%{term}%')) |
                                  (Recipe.ingredients.ilike(f'%{term}%')) |
                                  (Recipe.instructions.ilike(f'%{term}%'))).offset(offset).limit(20).all()
    return {'recipes': [recipe.to_preview_dict() for recipe in recipes]}


@recipe_routes.route('/<int:id>')
def get_recipe_details(id):
    recipe = Recipe.query.get(id)
    if(recipe is None):
        return {'message': 'Recipe not found'}, 404
    return recipe.to_details_dict()
