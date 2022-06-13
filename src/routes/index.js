const { Router } = require('express');
const router = Router();
const postService = require('../services/post/routes')
const docs = require('./docs');

router.use('/post', postService);
router.use('/docs', docs);

module.exports = router