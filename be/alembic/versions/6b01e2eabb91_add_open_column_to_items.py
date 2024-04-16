"""add open column to items

Revision ID: 6b01e2eabb91
Revises: 768abb2e997c
Create Date: 2024-04-16 08:04:23.984343

"""
from typing import Sequence, Union

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = '6b01e2eabb91'
down_revision: Union[str, None] = '768abb2e997c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('items', sa.Column('open', sa.Boolean(),
                  nullable=False, server_default=sa.false()))


def downgrade() -> None:
    op.drop_column('items', 'open')
