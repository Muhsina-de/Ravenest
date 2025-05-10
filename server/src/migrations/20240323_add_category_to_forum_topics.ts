import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.addColumn('forum_topics', 'category', {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'General Discussion'
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.removeColumn('forum_topics', 'category');
} 