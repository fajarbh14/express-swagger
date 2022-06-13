const { Router } = require('express');
const PostController = require('../../post/controllers/PostController');
const router = Router();

router.post('/addPost',PostController.createPost);
router.put('/updatePost', PostController.updatedPost);
router.delete('/deletePost', PostController.deletePost);
router.get('/getAllPost', PostController.getAllPost);
router.get('/getPostById/:id', PostController.getPostById);

module.exports = router;
