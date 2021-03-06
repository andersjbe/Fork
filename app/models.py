from flask_sqlalchemy import SQLAlchemy
import bcrypt

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    encrypted_password = db.Column(db.LargeBinary, nullable=False)
    image_url = db.Column(db.String, nullable=False)

    recipes = db.relationship("Recipe", back_populates="user")
    collections = db.relationship("Collection")

    def to_dict(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            'last_name': self.last_name,
            "email": self.email,
            'image_url': self.image_url,
            'collections': [{'id': colection.id, 'name': collection.name} for collection in self.collections]
        }

    @classmethod
    def create(cls, first_name, last_name, email, password, image_url='https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg'):
        encrypted_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(14))
        user = cls(first_name=first_name, last_name=last_name, email=email, encrypted_password=encrypted_password, image_url=image_url)
        return user

    def check_password(self, attempt):
        return bcrypt.checkpw(attempt.encode('utf-8'), self.encrypted_password)

class RecipeCategory(db.Model):
    __tablename__ = 'recipe_categories'

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(50), nullable=False)

    recipes = db.relationship("Recipe", back_populates="category")

class CollectedRecipe(db.Model):
    __tablename__ = 'collected_recipes'

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)
    collection_id = db.Column(db.Integer, db.ForeignKey('collections.id'), nullable=False)


class Recipe(db.Model):
    __tablename__ = 'recipes'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable = False)
    description = db.Column(db.Text)
    ingredients = db.Column(db.Text, nullable = False)
    instructions = db.Column(db.Text, nullable = False)
    image_src = db.Column(db.String, default='https://increasify.com.au/wp-content/uploads/2016/08/default-image.png')
    from_url = db.Column(db.String)
    from_recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    category_id = db.Column(db.Integer, db.ForeignKey('recipe_categories.id'))

    user = db.relationship("User", back_populates="recipes")
    category = db.relationship('RecipeCategory', back_populates="recipes")
    notes = db.relationship('Note')
    # collections = db.relationship('Collection', secondary='collected_recipes', backref=db.backref('recipes'))

    def to_preview_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'image_src': self.image_src,
            'user': {
                'id': self.user.id,
                'name': f'{self.user.first_name} {self.user.last_name}'
            },
            'category': self.category.category
        }

    def to_details_dict(self):
        from_recipe = {}
        if self.from_recipe_id:
            from_recipe = Recipe.query.get(self.from_recipe_id).to_preview_dict()

        forks = Recipe.query.filter(Recipe.from_recipe_id == self.id).all()
        forked_obj = [fork.to_preview_dict() for fork in forks] 

        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'ingredients': self.ingredients,
            'instructions': self.instructions,
            'image_src': self.image_src,
            'from_recipe': from_recipe,
            'forks': forked_obj,
            'user': {
                'id': self.user.id,
                'name': f'{self.user.first_name} {self.user.last_name}',
                'image_url': self.user.image_url
            }, 
            'category': {
                'id': self.category.id,
                'category': self.category.category
            },
            'notes': [note.to_dict() for note in reversed(self.notes)]
        }

class Note(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)

    user = db.relationship('User')

    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'user': self.user.to_dict()
        }

class Collection(db.Model):
    __tablename__ = 'collections'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    recipes = db.relationship('Recipe', secondary='collected_recipes', backref=db.backref('collections'))

    def to_dict(self):
        return {
            'recipes': {recipe.id: recipe.to_preview_dict() for recipe in self.recipes}
        }