"""add position column on items

Revision ID: d97da8b371b9
Revises: c86201a312ca
Create Date: 2024-04-14 15:27:11.553101

"""
from typing import Sequence, Union

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = 'd97da8b371b9'
down_revision: Union[str, None] = 'c86201a312ca'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('items', sa.Column(
        'position', sa.Float(), nullable=False))


def downgrade() -> None:
    op.drop_column('items', 'position')
