"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const db = mongoose_1.default.connection;
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fitnessGoal: String,
    level: String,
    city: String,
    age: Number,
}, { timestamps: true });
const teamSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    sport: { type: String, required: true },
    members: [{ type: String }],
    captain: String,
}, { timestamps: true });
const activitySchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    type: String,
    duration: Number,
    calories: Number,
    distanceKm: Number,
    owner: String,
    completedAt: { type: Date, default: Date.now },
}, { timestamps: true });
const leaderboardEntrySchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    score: { type: Number, required: true },
    category: String,
    streak: Number,
}, { timestamps: true });
const workoutSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    focus: String,
    duration: Number,
    difficulty: String,
    equipment: [{ type: String }],
}, { timestamps: true });
exports.User = mongoose_1.default.models.User || mongoose_1.default.model('User', userSchema);
exports.Team = mongoose_1.default.models.Team || mongoose_1.default.model('Team', teamSchema);
exports.Activity = mongoose_1.default.models.Activity || mongoose_1.default.model('Activity', activitySchema);
exports.LeaderboardEntry = mongoose_1.default.models.LeaderboardEntry || mongoose_1.default.model('LeaderboardEntry', leaderboardEntrySchema);
exports.Workout = mongoose_1.default.models.Workout || mongoose_1.default.model('Workout', workoutSchema);
const connectToDatabase = async () => {
    if (db.readyState === 1) {
        return;
    }
    await mongoose_1.default.connect(connectionString);
};
exports.connectToDatabase = connectToDatabase;
mongoose_1.default
    .connect(connectionString)
    .then(() => {
    console.log('Connected to octofit_db');
})
    .catch((error) => {
    console.error('Error connecting to octofit_db:', error);
    process.exit(1);
});
db.on('error', console.error.bind(console, 'connection error:'));
exports.default = db;
