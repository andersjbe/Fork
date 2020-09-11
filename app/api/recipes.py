from flask import Blueprint, jsonify, request

from ..models import db, Recipe

recipe_routes = Blueprint('recipes', __name__)

@recipe_routes.route(methods=["POST"])
def post_recipe():
    