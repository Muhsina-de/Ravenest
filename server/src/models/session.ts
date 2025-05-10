import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface SessionAttributes {
    id: number;
    menteeId: number;
    mentorId: number;
    status: string;
    date: Date;
    time: string;
    skill: string;
    price: number;
    sessionNotes: string;
    duration: number;
    message: string;
}

interface SessionCreationAttributes extends Optional<SessionAttributes, 'id'> {}

export class Session extends Model<SessionAttributes, SessionCreationAttributes> implements SessionAttributes {
    public id!: number;
    public menteeId!: number;
    public mentorId!: number;
    public status!: string;
    public date!: Date;
    public time!: string;
    public skill!: string;
    public price!: number;
    public sessionNotes!: string;
    public duration!: number;
    public message!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function initSession(sequelize: Sequelize): typeof Session {
    Session.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            menteeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            mentorId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM('pending', 'accepted', 'rejected', 'cancelled'),
                defaultValue: 'pending',
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            time: {
                type: DataTypes.TIME,
                allowNull: false,
            },
            skill: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            sessionNotes: {
                type: DataTypes.TEXT,
            },
            duration: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            message: {
                type: DataTypes.TEXT,
            },
        },
        {
            sequelize,
            modelName: 'Session',
            tableName: 'sessions',
            timestamps: true,
        }
    );

    return Session;
}
