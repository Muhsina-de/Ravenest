import { Session } from "../models/session";

export const seedSessions = async () => {
    await Session.bulkCreate([
        {
            menteeId: 4, // Alex Rivera
            mentorId: 1, // JohnDoe
            status: 'accepted',
            date: new Date('2024-03-20'),
            time: '14:00',
            skill: 'React',
            price: 50,
            duration: 60,
            sessionNotes: 'Introduction to React Hooks',
            message: 'Looking forward to learning React!'
        },
        {
            menteeId: 5, // Sophie Chen
            mentorId: 3, // BobJohnson
            status: 'accepted',
            date: new Date('2024-03-21'),
            time: '15:00',
            skill: 'PostgreSQL',
            price: 60,
            duration: 90,
            sessionNotes: 'Database design fundamentals',
            message: 'Need help with database concepts'
        },
        {
            menteeId: 6, // Marcus Johnson
            mentorId: 1, // JohnDoe
            status: 'pending',
            date: new Date('2024-03-25'),
            time: '16:00',
            skill: 'Node.js',
            price: 55,
            duration: 60,
            sessionNotes: 'Building REST APIs',
            message: 'Want to learn backend development'
        }
    ], { individualHooks: true });
};
