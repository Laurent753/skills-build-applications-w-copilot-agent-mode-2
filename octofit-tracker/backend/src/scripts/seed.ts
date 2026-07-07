import mongoose from 'mongoose';
import {
  Activity,
  LeaderboardEntry,
  Team,
  User,
  Workout,
  connectToDatabase,
} from '../config/database';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  try {
    await connectToDatabase();

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
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

    const teams = await Team.insertMany([
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

    const activities = await Activity.insertMany([
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

    const leaderboardEntries = await LeaderboardEntry.insertMany([
      { name: 'Maya Chen', score: 980, category: 'weekly', streak: 6 },
      { name: 'Jordan Silva', score: 912, category: 'weekly', streak: 4 },
      { name: 'Lina Patel', score: 885, category: 'weekly', streak: 3 },
    ]);

    const workouts = await Workout.insertMany([
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
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
