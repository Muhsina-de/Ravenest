import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import type { User } from './userprofile';
import type ForumComment from './ForumComments';

interface ForumTopicAttributes {
  id: number;
  title: string;
  content: string;
  category: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ForumTopicCreationAttributes extends Optional<ForumTopicAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class ForumTopic extends Model<ForumTopicAttributes, ForumTopicCreationAttributes> implements ForumTopicAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
  public category!: string;
  public authorId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations
  public static associate(models: { User: typeof User; ForumComment: typeof ForumComment }): void {
    this.belongsTo(models.User, { foreignKey: 'authorId', as: 'Author' });
    this.hasMany(models.ForumComment, { foreignKey: 'topicId', as: 'Comments' });
  }

  public static initialize(sequelize: Sequelize): void {
    ForumTopic.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        authorId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'ForumTopic',
        tableName: 'forum_topics',
      }
    );
  }
}

export default ForumTopic;
