"""create items table

Revision ID: c86201a312ca
Revises: 
Create Date: 2024-04-14 14:00:10.400290

"""
from typing import Sequence, Union

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = 'c86201a312ca'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'items',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('content', sa.String(), nullable=False),
        sa.Column('parent_id', sa.Integer(), sa.ForeignKey(
            'items.id', ondelete='set null')),
    )


def downgrade() -> None:
    op.drop_table('items')
