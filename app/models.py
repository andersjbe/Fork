from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    encrypted_password = db.Column(db.LargeBinary, nullable=False)
    image_url = db.Column(db.String, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            'last_name': self.last_name,
            "email": self.email,
            'image_url': self.image_url
        }

    @classmethod
    def create(cls, first_name, last_name, email, password, image_url='https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg'):
        encrypted_password = generate_password_hash(password, 'sha256')
        user = cls(first_name=first_name, email=email, encrypted_password=encrypted_password, image_url=image_url)
        return user.to_dict()

    def check_password(self, attempt):
        return check_password_hash(self.encrypted_password, attempt)