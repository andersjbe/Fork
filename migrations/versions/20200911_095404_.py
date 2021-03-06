"""empty message

Revision ID: 43616d75cf2a
Revises: df2e1a12044f
Create Date: 2020-09-11 09:54:04.303695

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '43616d75cf2a'
down_revision = 'df2e1a12044f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('recipe_categories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('category', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('recipes', sa.Column('category_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'recipes', 'recipe_categories', ['category_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'recipes', type_='foreignkey')
    op.drop_column('recipes', 'category_id')
    op.drop_table('recipe_categories')
    # ### end Alembic commands ###
