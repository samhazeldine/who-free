const { Router } = require('express');
const AvailabilityController = require('../controllers/availabilityController')

const router = Router();

router.get('/', AvailabilityController.getAvailability);
router.post('/', AvailabilityController.createAvailability);

module.exports = router;