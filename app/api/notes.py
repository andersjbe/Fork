from flask import Blueprint, jsonify, request

from ..models import db, Note, Recipe

note_routes = Blueprint('notes', __name__)


@note_routes.route('/<int:id>', methods=['PUT', 'DELETE'])
def note(id):
    note = Note.query.get(id)

    if note == None:
        return {'message': 'Note not found'}, 404

    if request.method == 'PUT':
        note.body = request.json.get('body')
        db.session.commit()
    if request.method == 'DELETE':
        db.session.delete(note)
        db.session.commit()
    return {'notes': [note.to_dict() for note in Note.query.filter(Note.recipe_id == note.recipe_id).all()]}
