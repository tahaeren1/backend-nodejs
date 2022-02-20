const express = require('express');
const question = require('./question');
const auth = require('./auth');

// /api yazıldıgında buraya gelicek
const router = express.Router();

router.use("/questions",question);
router.use("/auth",auth);

module.exports = router;