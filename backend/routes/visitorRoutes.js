const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const ctrl = require('../controllers/visitorController');

router.use(protect);
router.post('/', ctrl.createVisitor);
router.get('/', ctrl.listVisitors);
router.get('/:id', ctrl.getVisitor);
router.put('/:id', ctrl.updateVisitor);
router.delete('/:id', ctrl.deleteVisitor);

module.exports = router;
