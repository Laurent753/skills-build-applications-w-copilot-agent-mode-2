import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const db = mongoose.connection;

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fitnessGoal: String,
    level: String,
    city: String,
    age: Number,
  },
  { timestamps: true }
);

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sport: { type: String, required: true },
    members: [{ type: String }],
    captain: String,
  },
  { timestamps: true }
);

const activitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: String,
    duration: Number,
    calories: Number,
    distanceKm: Number,
    owner: String,
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const leaderboardEntrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    score: { type: Number, required: true },
    category: String,
    streak: Number,
  },
  { timestamps: true }
);

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    focus: String,
    duration: Number,
    difficulty: String,
    equipment: [{ type: String }],
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.models.LeaderboardEntry || mongoose.model('LeaderboardEntry', leaderboardEntrySchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);

export const connectToDatabase = async () => {
  if (db.readyState === 1) {
    return;
  }

  await mongoose.connect(connectionString);
};

mongoose
  .connect(connectionString)
  .then(() => {
    console.log('Connected to octofit_db');
  })
  .catch((error) => {
    console.error('Error connecting to octofit_db:', error);
    process.exit(1);
  });

db.on('error', console.error.bind(console, 'connection error:'));

export default db;
