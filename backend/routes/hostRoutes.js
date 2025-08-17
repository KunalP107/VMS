const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const ctrl = require('../controllers/hostController');

router.use(protect);
router.post('/', ctrl.createHost);
router.get('/', ctrl.listHosts);
router.get('/:id', ctrl.getHost);
router.put('/:id', ctrl.updateHost);
router.delete('/:id', ctrl.deleteHost);

module.exports = router;
