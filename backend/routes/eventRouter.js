const { Router } = require('express');
const eventController = require('../controllers/eventController')

const router = Router();

router.get('/:event_id', eventController.getById);
router.post('/', eventController.create);

module.exports = router;