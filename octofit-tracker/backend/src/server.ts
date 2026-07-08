import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {
  Activity,
  LeaderboardEntry,
  Team,
  User,
  Workout,
  connectToDatabase,
} from './config/database';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

connectToDatabase().catch((error) => {
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

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl });
});

app.get('/api/config', (_req, res) => {
  res.json({ apiBaseUrl, port });
});

app.get(['/api/users', '/api/users/'], async (_req, res) => {
  if (mongoose.connection.readyState === 1) {
    const users = await User.find().lean();
    return res.json(users.length ? users : fallbackUsers);
  }

  return res.json(fallbackUsers);
});

app.post(['/api/users', '/api/users/'], (req, res) => {
  const user = { ...req.body, createdAt: new Date().toISOString() };
  res.status(201).json(user);
});

app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  if (mongoose.connection.readyState === 1) {
    const teams = await Team.find().lean();
    return res.json(teams.length ? teams : fallbackTeams);
  }

  return res.json(fallbackTeams);
});

app.post(['/api/teams', '/api/teams/'], (req, res) => {
  const team = { ...req.body, createdAt: new Date().toISOString() };
  res.status(201).json(team);
});

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  if (mongoose.connection.readyState === 1) {
    const activities = await Activity.find().lean();
    return res.json(activities.length ? activities : fallbackActivities);
  }

  return res.json(fallbackActivities);
});

app.post(['/api/activities', '/api/activities/'], (req, res) => {
  const activity = { ...req.body, createdAt: new Date().toISOString() };
  res.status(201).json(activity);
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  if (mongoose.connection.readyState === 1) {
    const leaderboard = await LeaderboardEntry.find().lean();
    return res.json(leaderboard.length ? leaderboard : fallbackLeaderboard);
  }

  return res.json(fallbackLeaderboard);
});

app.post(['/api/leaderboard', '/api/leaderboard/'], (req, res) => {
  const entry = { ...req.body, createdAt: new Date().toISOString() };
  res.status(201).json(entry);
});

app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  if (mongoose.connection.readyState === 1) {
    const workouts = await Workout.find().lean();
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

export { app };

