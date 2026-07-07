"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("./config/database");
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
(0, database_1.connectToDatabase)().catch((error) => {
    console.warn('MongoDB connection unavailable, continuing without it:', error.message);
});
const fallbackUsers = [
    { name: 'Ava', email: 'ava@example.com', fitnessGoal: 'endurance', level: 'intermediate' },
    { name: 'Noah', email: 'noah@example.com', fitnessGoal: 'strength', level: 'advanced' },
];
const fallbackTeams = [
    { name: 'River Runners', sport: 'running', members: ['Ava', 'Noah'] },
    { name: 'Peak Cyclists', sport: 'cycling', members: ['Mia', 'Leo'] },
];
const fallbackActivities = [
    { title: 'Morning run', type: 'cardio', duration: 30, calories: 280, owner: 'Ava' },
    { title: 'Strength circuit', type: 'strength', duration: 45, calories: 320, owner: 'Noah' },
];
const fallbackLeaderboard = [
    { name: 'Ava', score: 980, category: 'weekly' },
    { name: 'Noah', score: 915, category: 'weekly' },
];
const fallbackWorkouts = [
    { title: 'Tempo intervals', focus: 'cardio', duration: 25, difficulty: 'moderate' },
    { title: 'Core burner', focus: 'core', duration: 20, difficulty: 'easy' },
];
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl });
});
app.get('/api/config', (_req, res) => {
    res.json({ apiBaseUrl, port });
});
app.get(['/api/users', '/api/users/'], async (_req, res) => {
    if (mongoose_1.default.connection.readyState === 1) {
        const users = await database_1.User.find().lean();
        return res.json(users.length ? users : fallbackUsers);
    }
    return res.json(fallbackUsers);
});
app.post(['/api/users', '/api/users/'], (req, res) => {
    const user = { ...req.body, createdAt: new Date().toISOString() };
    res.status(201).json(user);
});
app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    if (mongoose_1.default.connection.readyState === 1) {
        const teams = await database_1.Team.find().lean();
        return res.json(teams.length ? teams : fallbackTeams);
    }
    return res.json(fallbackTeams);
});
app.post(['/api/teams', '/api/teams/'], (req, res) => {
    const team = { ...req.body, createdAt: new Date().toISOString() };
    res.status(201).json(team);
});
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    if (mongoose_1.default.connection.readyState === 1) {
        const activities = await database_1.Activity.find().lean();
        return res.json(activities.length ? activities : fallbackActivities);
    }
    return res.json(fallbackActivities);
});
app.post(['/api/activities', '/api/activities/'], (req, res) => {
    const activity = { ...req.body, createdAt: new Date().toISOString() };
    res.status(201).json(activity);
});
app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    if (mongoose_1.default.connection.readyState === 1) {
        const leaderboard = await database_1.LeaderboardEntry.find().lean();
        return res.json(leaderboard.length ? leaderboard : fallbackLeaderboard);
    }
    return res.json(fallbackLeaderboard);
});
app.post(['/api/leaderboard', '/api/leaderboard/'], (req, res) => {
    const entry = { ...req.body, createdAt: new Date().toISOString() };
    res.status(201).json(entry);
});
app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    if (mongoose_1.default.connection.readyState === 1) {
        const workouts = await database_1.Workout.find().lean();
        return res.json(workouts.length ? workouts : fallbackWorkouts);
    }
    return res.json(fallbackWorkouts);
});
app.post(['/api/workouts', '/api/workouts/'], (req, res) => {
    const workout = { ...req.body, createdAt: new Date().toISOString() };
    res.status(201).json(workout);
});
app.listen(port, () => {
    console.log(`OctoFit backend listening on port ${port}`);
    console.log(`API base URL: ${apiBaseUrl}`);
});
