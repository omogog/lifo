const express = require('express');
const StackController = require('../controllers/stackController');

const router = express.Router();
const stackController = new StackController();

router.post('/add', (req, res) => stackController.addToStack(req, res));
router.get('/get', (req, res) => stackController.getFromStack(req, res));

module.exports = router;