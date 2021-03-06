"""empty message

Revision ID: b88bcf94c1e7
Revises: 2708b1688a48
Create Date: 2020-09-10 17:22:24.579829

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b88bcf94c1e7'
down_revision = '2708b1688a48'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('recipes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('ingredients', sa.String(), nullable=False),
    sa.Column('instructions', sa.String(length=500), nullable=False),
    sa.Column('image_src', sa.String(), nullable=False),
    sa.Column('from_url', sa.String(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('recipes')
    # ### end Alembic commands ###
