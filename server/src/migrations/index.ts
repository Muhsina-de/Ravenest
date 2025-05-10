import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/connection';

export async function up() {
    try {
        await sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
        
        // Create users table first
        await sequelize.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                skills JSONB DEFAULT '[]',
                role VARCHAR(50) NOT NULL,
                rating FLOAT DEFAULT 0,
                "profilePicture" VARCHAR(255),
                bio TEXT,
                availability JSONB DEFAULT '[]',
                location VARCHAR(255),
                linkedin VARCHAR(255),
                github VARCHAR(255),
                twitter VARCHAR(255),
                "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Create sessions table
        await sequelize.query(`
            CREATE TABLE IF NOT EXISTS sessions (
                id SERIAL PRIMARY KEY,
                "mentorId" INTEGER REFERENCES users(id),
                "menteeId" INTEGER REFERENCES users(id),
                status VARCHAR(50) NOT NULL,
                "startTime" TIMESTAMP WITH TIME ZONE,
                "endTime" TIMESTAMP WITH TIME ZONE,
                notes TEXT,
                "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Create reviews table
        await sequelize.query(`
            CREATE TABLE IF NOT EXISTS reviews (
                id SERIAL PRIMARY KEY,
                "mentor_id" INTEGER REFERENCES users(id),
                "mentee_id" INTEGER REFERENCES users(id),
                rating INTEGER NOT NULL,
                comment TEXT,
                "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Create forum topics table
        await sequelize.query(`
            CREATE TABLE IF NOT EXISTS forum_topics (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                category VARCHAR(255) NOT NULL DEFAULT 'General Discussion',
                "authorId" INTEGER REFERENCES users(id),
                "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Create forum replies table
        await sequelize.query(`
            CREATE TABLE IF NOT EXISTS forum_replies (
                id SERIAL PRIMARY KEY,
                content TEXT NOT NULL,
                "topicId" INTEGER REFERENCES forum_topics(id),
                "authorId" INTEGER REFERENCES users(id),
                "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log('Migration completed successfully');
    } catch (error) {
        console.error('Error during migration:', error);
        throw error;
    }
}

export async function down() {
    try {
        await sequelize.query('DROP TABLE IF EXISTS forum_replies CASCADE;');
        await sequelize.query('DROP TABLE IF EXISTS forum_topics CASCADE;');
        await sequelize.query('DROP TABLE IF EXISTS reviews CASCADE;');
        await sequelize.query('DROP TABLE IF EXISTS sessions CASCADE;');
        await sequelize.query('DROP TABLE IF EXISTS users CASCADE;');
        console.log('Rollback completed successfully');
    } catch (error) {
        console.error('Error during rollback:', error);
        throw error;
    }
}

// Run migrations if this file is executed directly
if (require.main === module) {
    up().then(() => {
        console.log('Migrations completed');
        process.exit(0);
    }).catch(error => {
        console.error('Migration failed:', error);
        process.exit(1);
    });
} 