"""rename position to weight in items

Revision ID: 768abb2e997c
Revises: d97da8b371b9
Create Date: 2024-04-16 07:16:36.946174

"""
from typing import Sequence, Union

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = '768abb2e997c'
down_revision: Union[str, None] = 'd97da8b371b9'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.alter_column('items', 'position', new_column_name='weight')


def downgrade() -> None:
    op.alter_column('items', 'weight', new_column_name='position')
