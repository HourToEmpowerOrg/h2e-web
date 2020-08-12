"""user status

Revision ID: 06c4a743b206
Revises: 20492670e416
Create Date: 2020-08-10 19:45:15.027605

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision = '06c4a743b206'
down_revision = '20492670e416'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    user_status_enum = postgresql.ENUM('ACTIVE', 'INACTIVE', name='user_status', create_type=True,
                                     nullable=False)
    user_status_enum.create(op.get_bind())
    op.add_column('user', sa.Column('user_status', sa.Enum('ACTIVE', 'INACTIVE', name='user_status'), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'user_status')
    # ### end Alembic commands ###