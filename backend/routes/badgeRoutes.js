const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const ctrl = require('../controllers/badgeController');

router.use(protect);
router.get('/:id', ctrl.getBadge);
router.post('/:id/activate', ctrl.activate);
router.post('/:id/deactivate', ctrl.deactivate);

module.exports = router;
