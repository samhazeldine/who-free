const { Router } = require('express');
const eventController = require('../controllers/eventController')

const router = Router();

router.get('/:event_id', eventController.getEvent);

module.exports = router;