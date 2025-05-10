import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    skills: string[];
    role: string;
    rating: number;
    profilePicture: string;
    bio: string;
    availability: string[];
    location: string;
    linkedin: string;
    github: string;
    twitter: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public skills!: string[];
    public role!: string;
    public rating!: number;
    public profilePicture!: string;
    public bio!: string;
    public availability!: string[];
    public location!: string;
    public linkedin!: string;
    public github!: string;
    public twitter!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function initUser(sequelize: Sequelize): typeof User {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            skills: {
                type: DataTypes.JSONB,
                allowNull: true,
                defaultValue: [],
                get() {
                    const value = this.getDataValue('skills');
                    return value || [];
                },
                set(value: string[]) {
                    this.setDataValue('skills', value || []);
                }
            },
            role: {
                type: DataTypes.ENUM('mentor', 'mentee'),
                allowNull: false,
            },
            rating: {
                type: DataTypes.FLOAT,
                defaultValue: 0,
                validate: {
                    min: 0,
                    max: 5,
                },
            },
            profilePicture: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'profilePicture'
            },
            bio: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            availability: {
                type: DataTypes.JSONB,
                allowNull: true,
                defaultValue: [],
                get() {
                    const value = this.getDataValue('availability');
                    return value || [];
                },
                set(value: string[]) {
                    this.setDataValue('availability', value || []);
                }
            },
            location: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            linkedin: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            github: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            twitter: {
                type: DataTypes.STRING,
                allowNull: true,
            }
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            timestamps: true,
        }
    );

    return User;
}