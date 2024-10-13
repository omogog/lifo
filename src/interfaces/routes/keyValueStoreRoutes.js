const express = require('express');
const KeyValueStoreController = require('../controllers/keyValueStoreController');

const router = express.Router();
const kvStoreController = new KeyValueStoreController();

router.post('/add', (req, res) => kvStoreController.addToKeyValueStore(req, res));
router.get('/get/:key', (req, res) => kvStoreController.getFromKeyValueStore(req, res));
router.delete('/delete/:key', (req, res) => kvStoreController.deleteFromKeyValueStore(req, res));

module.exports = router;