const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const animeCtrl = require('../controllers/anime');

router.get('/', animeCtrl.getAllAnime);
router.post('/', animeCtrl.createAnime);
router.get('/:id', animeCtrl.getOneAnime);
router.put('/:id', animeCtrl.modifyAnime);
router.delete('/:id', animeCtrl.deleteAnime);

module.exports = router;