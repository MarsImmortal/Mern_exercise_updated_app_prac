const router = require('express').Router();
const Exercise = require('../models/exercise.model');

// Get all exercises
router.route('/').get(async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Add a new exercise
router.route('/add').post(async (req, res) => {
  const { username, description, duration, date } = req.body;

  try {
    const newExercise = new Exercise({
      username,
      description,
      duration: Number(duration),
      date: Date.parse(date),
    });

    await newExercise.save();
    res.json('Exercise added!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Get an exercise by ID
router.route('/:id').get(async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    res.json(exercise);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Delete an exercise by ID
router.route('/:id').delete(async (req, res) => {
  try {
    await Exercise.findByIdAndDelete(req.params.id);
    res.json('Exercise deleted.');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Update an exercise by ID
router.route('/update/:id').post(async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    exercise.username = req.body.username;
    exercise.description = req.body.description;
    exercise.duration = Number(req.body.duration);
    exercise.date = Date.parse(req.body.date);

    await exercise.save();
    res.json('Exercise updated!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
