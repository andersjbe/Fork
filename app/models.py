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
        encrypted_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(14))
        user = cls(first_name=first_name, last_name=last_name, email=email, encrypted_password=encrypted_password, image_url=image_url)
        return user

    def check_password(self, attempt):
        return bcrypt.checkpw(attempt.encode('utf-8'), self.encrypted_password)