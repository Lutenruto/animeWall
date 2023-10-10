const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const animeCtrl = require('../controllers/anime');

router.get('/', auth, animeCtrl.getAllAnime);
router.post('/', auth, animeCtrl.createAnime);
router.get('/:id', auth, animeCtrl.getOneAnime);
router.put('/:id', auth, animeCtrl.modifyAnime);
router.delete('/:id', auth, animeCtrl.deleteAnime);

module.exports = router;