from flask import Blueprint, jsonify, request
import boto3
from uuid import uuid4

from ..models import db, Recipe, RecipeCategory

recipe_routes = Blueprint('recipes', __name__)

s3 = boto3.resource('s3')
bucket = s3.Bucket(name="andersjbe-fork")

@recipe_routes.route('', methods=["POST"])
def post_recipe():
    image_url = 'https://andersjbe-fork.s3-us-west-1.amazonaws.com/unnamed.jpg'
    if len(request.files) > 0:
        image = request.files['file']
        key=f'{uuid4()}{image.filename}'
        bucket.put_object(Key=key, Body=image, ContentType=image.content_type)
        image_url = f'https://andersjbe-fork.s3-us-west-1.amazonaws.com/{key}'
    
    recipe_data = {
        'title': request.form.get('title'),
        'description': request.form.get('description'),
        'ingredients': request.form.get('ingredients'),
        'instructions': request.form.get('instructions'),
        'user_id': request.form.get('userId'),
        'category_id': request.form.get('categoryId'),
        'from_recipe_id': request.form.get('fromRecipeId'),
        'image_src': image_url
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
