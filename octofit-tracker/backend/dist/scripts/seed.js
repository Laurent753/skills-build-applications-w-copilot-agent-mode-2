"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../config/database");
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    console.log('Seed the octofit_db database with test data');
    try {
        await (0, database_1.connectToDatabase)();
        await Promise.all([
            database_1.User.deleteMany({}),
            database_1.Team.deleteMany({}),
            database_1.Activity.deleteMany({}),
            database_1.LeaderboardEntry.deleteMany({}),
            database_1.Workout.deleteMany({}),
        ]);
        const users = await database_1.User.insertMany([
            {
                name: 'Maya Chen',
                email: 'maya.chen@example.com',
                fitnessGoal: 'marathon training',
                level: 'advanced',
                city: 'Seattle',
                age: 32,
            },
            {
                name: 'Jordan Silva',
                email: 'jordan.silva@example.com',
                fitnessGoal: 'strength and mobility',
                level: 'intermediate',
                city: 'Denver',
                age: 29,
            },
            {
                name: 'Lina Patel',
                email: 'lina.patel@example.com',
                fitnessGoal: 'weight loss',
                level: 'beginner',
                city: 'Austin',
                age: 27,
            },
        ]);
        const teams = await database_1.Team.insertMany([
            {
                name: 'River Runners',
                sport: 'running',
                members: ['Maya Chen', 'Jordan Silva'],
                captain: 'Maya Chen',
            },
            {
                name: 'Peak Cyclists',
                sport: 'cycling',
                members: ['Lina Patel', 'Noah Brooks'],
                captain: 'Lina Patel',
            },
        ]);
        const activities = await database_1.Activity.insertMany([
            {
                title: 'Sunrise 10K',
                type: 'cardio',
                duration: 55,
                calories: 620,
                distanceKm: 10,
                owner: 'Maya Chen',
            },
            {
                title: 'Strength Builder',
                type: 'strength',
                duration: 40,
                calories: 340,
                owner: 'Jordan Silva',
            },
            {
                title: 'Yoga Flow',
                type: 'mobility',
                duration: 30,
                calories: 180,
                owner: 'Lina Patel',
            },
        ]);
        const leaderboardEntries = await database_1.LeaderboardEntry.insertMany([
            { name: 'Maya Chen', score: 980, category: 'weekly', streak: 6 },
            { name: 'Jordan Silva', score: 912, category: 'weekly', streak: 4 },
            { name: 'Lina Patel', score: 885, category: 'weekly', streak: 3 },
        ]);
        const workouts = await database_1.Workout.insertMany([
            {
                title: 'Tempo Intervals',
                focus: 'cardio',
                duration: 25,
                difficulty: 'moderate',
                equipment: ['running shoes'],
            },
            {
                title: 'Core Burner',
                focus: 'core',
                duration: 20,
                difficulty: 'easy',
                equipment: ['mat'],
            },
            {
                title: 'Upper Body Strength',
                focus: 'strength',
                duration: 35,
                difficulty: 'moderate',
                equipment: ['dumbbells'],
            },
        ]);
        console.log('Database seeding complete');
        console.log({ users: users.length, teams: teams.length, activities: activities.length, leaderboardEntries: leaderboardEntries.length, workouts: workouts.length });
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
    finally {
        await mongoose_1.default.disconnect();
    }
}
seedDatabase();
