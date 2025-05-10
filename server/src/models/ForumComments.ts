import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import type { User } from './userprofile';
import type ForumTopic from './ForumTopics';

interface ForumCommentAttributes {
  id: number;
  content: string;
  authorId: number;
  topicId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ForumCommentCreationAttributes extends Optional<ForumCommentAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class ForumComment extends Model<ForumCommentAttributes, ForumCommentCreationAttributes> implements ForumCommentAttributes {
  public id!: number;
  public content!: string;
  public authorId!: number;
  public topicId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations
  public static associate(models: { User: typeof User; ForumTopic: typeof ForumTopic }): void {
    this.belongsTo(models.User, { foreignKey: 'authorId', as: 'Author' });
    this.belongsTo(models.ForumTopic, { foreignKey: 'topicId', as: 'Topic' });
  }

  public static initialize(sequelize: Sequelize): void {
    ForumComment.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        authorId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        topicId: {
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
        modelName: 'ForumComment',
        tableName: 'forum_replies',
      }
    );
  }
}

export default ForumComment;