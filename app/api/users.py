from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('')
def index():
    response = User.query.all()
    return {"users": [user.to_dict() for user in response]}

@user_routes.route('/users/<int:id>')
def get_user(id):
    user = User.query.filter(User.id == id).first()
    if user:
        return {'user': user.to_dict()}
    else:
        return {'message': 'User not found'}, 404

@user_routes.route('/login', methods=['POST'])
def login():
    # email = request.data['email']
    email = request.json.get('email')

    try:
        user = User.query.filter(User.email == email).one()
    except e:
        print(e)
        return {'message': 'User not found'}, 404

    password = request.json.get('password')
    matched = user.check_password(password)

    if not matched:
        return {'message': 'Incorrect password'}, 401

    token = create_access_token(identity=user.id)
    return {'user': user.to_dict(), 'token': token}


@user_routes.route('/signup', methods=['POST'])
def signup():
    print(request.json)
    first_name = request.json.get('firstName')
    last_name = request.json.get('lastName')
    email = request.json.get('email')
    password = request.json.get('password')

    errors = []

    existing_user = User.query.filter(User.email == email).first()
    if existing_user:
        errors.append('An account with that email already exists')

    if len(first_name) == 0:
        errors.append('Please enter a First Name')

    if len(last_name) == 0:
        errors.append('Please enter a Last Name')

    if len(email) == 0:
        errors.append('Please enter an email address')

    if len(password) == 0:
        errors.append('Please enter a password')

    if len(first_name) > 50:
        errors.append('First Name must be less than 51 characters')

    if len(last_name) > 50:
        errors.append('Last Name must be less than 51 characters')

    if len(password) > 255:
        errors.append('Password must be less than 256 character')

    if len(errors) > 0:
        return {'messages': errors}, 400

    new_user = User.create(first_name, last_name, email, password)
    db.session.add(new_user)
    db.session.commit()

    user = User.query.filter(User.email == email).one()
    token = create_access_token(user.id)
    return {'user': user.to_dict(), 'token': token}
