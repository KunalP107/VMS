const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const ctrl = require('../controllers/zoneController');

router.use(protect);
router.post('/', ctrl.createZone);
router.get('/', ctrl.listZones);
router.get('/:id', ctrl.getZone);
router.put('/:id', ctrl.updateZone);
router.delete('/:id', ctrl.deleteZone);

module.exports = router;
