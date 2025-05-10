import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/connection';

async function down() {
    try {
        // Drop dependent tables first
        await sequelize.query('DROP TABLE IF EXISTS sessions CASCADE;');
        await sequelize.query('DROP TABLE IF EXISTS reviews CASCADE;');
        await sequelize.query('DROP TABLE IF EXISTS users CASCADE;');
        console.log('Migration undone successfully');
    } catch (error) {
        console.error('Migration undo failed:', error);
        throw error;
    }
}

down().catch(console.error); 