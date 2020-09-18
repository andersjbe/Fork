import os
from flask import Flask, render_template, request, session
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

from app.models import db, User, RecipeCategory
from app.api.users import user_routes
from app.api.recipes import recipe_routes
from app.config import Config

app = Flask(__name__, static_url_path='')

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(recipe_routes, url_prefix='/api/recipes')
db.init_app(app)
Migrate(app, db)
jwt = JWTManager(app)

# Application Security
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get('FLASK_ENV') else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') else None,
                        httponly=True)
    return response


@app.route('/api/categories')
def get_categories():
    categories = RecipeCategory.query.all()
    return {'categories': [{'id': cat.id, 'category': cat.category} for cat in categories]}


@app.route('/', defaults={'path': ''})
@app.route('/<path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
