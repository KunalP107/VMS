const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const { onsite } = require('../controllers/reportController');

router.use(protect);
router.get('/onsite', onsite);

module.exports = router;
