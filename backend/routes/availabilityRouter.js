const { Router } = require('express');
const availabilityController = require('../controllers/availabilityController')

const router = Router();

router.get('/', availabilityController.getAllAvailability);
router.post('/', availabilityController.createAvailability);

module.exports = router;