const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('welcome'));
router.get('/index', (req, res) => res.render('index'));
router.get('/bookticket', (req, res) => res.render('bookticket'));
router.get('/browsepackages', (req, res) => res.render('browsepackages'));
router.get('/bookpackages', (req, res) => res.render('bookpackages'));

module.exports = router;