import { DataTypes, Model, Optional, Sequelize, ModelStatic } from 'sequelize';

/**
 * Interface representing a Review's attributes
 */
interface ReviewAttributes {
  id: number;
  mentee_id: number;
  mentor_id: number;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Interface for Review creation attributes
 * Excludes id as it's auto-generated
 */
interface ReviewCreationAttributes extends Optional<ReviewAttributes, 'id'> {}

/**
 * Review model class
 * Represents a review given by a mentee to a mentor
 */
export class Review extends Model<ReviewAttributes, ReviewCreationAttributes> implements ReviewAttributes {
  public id!: number;
  public mentee_id!: number;
  public mentor_id!: number;
  public rating!: number;
  public comment!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  /**
   * Updates the mentor's average rating based on all their reviews
   * @param mentor_id - ID of the mentor to update
   * @throws Error if the update fails
   */
  public static async updateMentorRating(mentor_id: number, User: ModelStatic<Model>): Promise<void> {
    try {
      const reviews = await Review.findAll({
        where: { mentor_id }
      });
      
      const averageRating = reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;
      
      await User.update(
        { rating: averageRating },
        { where: { id: mentor_id } }
      );
    } catch (error) {
      console.error('Error updating mentor rating:', error);
      throw new Error('Failed to update mentor rating');
    }
  }

  /**
   * Define associations with other models
   */
  public static associate(models: { User: ModelStatic<Model> }): void {
    this.belongsTo(models.User, { foreignKey: 'mentee_id', as: 'mentee' });
    this.belongsTo(models.User, { foreignKey: 'mentor_id', as: 'mentor' });
  }
}

/**
 * Initialize the Review model
 * @param sequelize - Sequelize instance
 * @returns Review model
 */
export function initializeReview(sequelize: Sequelize): typeof Review {
  Review.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      mentee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      mentor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [10, 1000]
        }
      }
    },
    {
      sequelize,
      modelName: 'Review',
      tableName: 'reviews',
      timestamps: true,
      underscored: false // This ensures we use camelCase for column names
    }
  );

  return Review;
} 