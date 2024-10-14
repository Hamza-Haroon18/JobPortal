// routes/jobRoutes.js
const { getJobs } = require('../controllers/jobController');
const express = require('express');
const router = express.Router();

// GET: Fetch all jobs
router.get('/jobs', getJobs);

module.exports = router;
