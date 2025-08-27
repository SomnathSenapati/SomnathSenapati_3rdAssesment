const express = require('express');
const router = express.Router();
const adminController = require('../../controller/admin/admincontroller');

router.get('/', adminController.dashboard);

module.exports = router;

