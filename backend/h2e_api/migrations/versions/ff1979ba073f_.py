"""empty message

Revision ID: ff1979ba073f
Revises: ebe0beb80699
Create Date: 2020-10-05 18:33:00.167833

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ff1979ba073f'
down_revision = 'ebe0beb80699'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('school', 'logo_url',
               existing_type=sa.VARCHAR(length=64),
               type_=sa.String(length=128),
               existing_nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('school', 'logo_url',
               existing_type=sa.String(length=128),
               type_=sa.VARCHAR(length=64),
               existing_nullable=True)
    # ### end Alembic commands ###