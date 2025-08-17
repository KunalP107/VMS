const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const ctrl = require('../controllers/watchlistController');

router.use(protect);
router.post('/', ctrl.addEntry);
router.get('/', ctrl.listEntries);
router.delete('/:id', ctrl.removeEntry);

module.exports = router;
