const express = require('express');
const auth = require('../middleware/auth');
const sauceCtrl = require('../controllers/sauce');

const router = express.Router();

router.get('/', auth, sauceCtrl.getAllSauce);
router.post('/', auth, sauceCtrl.createThing);
router.get('/:id', auth, sauceCtrl.getOneThing);
router.put('/:id', auth, sauceCtrl.modifyThing);
router.delete('/:id', auth, sauceCtrl.deleteThing);

module.exports = router;
