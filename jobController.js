// controllers/jobController.js
const getJobs = (req, res) => {
    db.query('SELECT * FROM jobs', (err, results) => {
      if (err) return res.status(500).json({ error: 'Error fetching jobs' });
      res.status(200).json(results);
    });
  };
  
  module.exports = { getJobs };
  