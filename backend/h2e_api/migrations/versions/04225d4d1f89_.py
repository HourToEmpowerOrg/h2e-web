"""empty message

Revision ID: 04225d4d1f89
Revises: cb7ca032ef2f
Create Date: 2021-03-21 12:30:48.831914

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '04225d4d1f89'
down_revision = 'cb7ca032ef2f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('tutor_page', 'page_id',
               existing_type=sa.VARCHAR(length=8),
               type_=sa.String(length=32),
               existing_nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('tutor_page', 'page_id',
               existing_type=sa.String(length=32),
               type_=sa.VARCHAR(length=8),
               existing_nullable=True)
    # ### end Alembic commands ###
