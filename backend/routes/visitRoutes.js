const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const ctrl = require('../controllers/visitController');

router.use(protect);
router.post('/', ctrl.createVisit);
router.get('/', ctrl.listVisits);
router.get('/:id', ctrl.getVisit);
router.put('/:id', ctrl.updateVisit);
router.post('/:id/checkin', ctrl.checkIn);
router.post('/:id/checkout', ctrl.checkOut);
router.delete('/:id', ctrl.deleteVisit);

module.exports = router;
