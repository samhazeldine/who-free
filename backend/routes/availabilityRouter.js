const { Router } = require('express');
const availabilityController = require('../controllers/availabilityController')

const router = Router();

router.get('/:event_id', availabilityController.getAllAvailabilityOnEventId);
router.post('/', availabilityController.createAvailability);

module.exports = router;