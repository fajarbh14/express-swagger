const Post = require('../models/Post')
const response = require('../../../utils/response')
const httpCodes = require('../../../utils/httpCodes')
const logger = require('../../../utils/logger')

module.exports = {
    async createPost(req,res){
        try{
            const post = await Post.create({
                title : req.body.title,
                content : req.body.content
            })
            return response(res, httpCodes.OK, 'Insert post success!',post)
        }catch (error) {
            logger.error(error.message)
            return response(res, httpCodes.INTERNAL_SERVER_ERROR, error.message, null)
        }
    },

    async updatedPost(req,res){
        try{
          const updatedPost = await Post.findByIdAndUpdate(req.body._id,{  
            title : req.body.title,
            content : req.body.content
        })  
        if (!updatedPost) return response(res, httpCodes.UNPROCESSABLE_ENTITY, 'Post not found.', null)
        return response(res, httpCodes.OK, 'Post updated!', updatedPost)
        }catch (error) {
            logger.error(error.message)
            return response(res, httpCodes.INTERNAL_SERVER_ERROR, error.message, null)
        }
    },

    async deletePost(req,res){
        try{
            const deletedPost = await Post.findByIdAndDelete(req.body._id)
            if (!deletedPost) return response(res, httpCodes.UNPROCESSABLE_ENTITY, 'Post not found.', null)
            return response(res, httpCodes.OK, 'Post deleted!', deletedPost)
        }catch (error) {
            logger.error(error.message)
            return response(res, httpCodes.INTERNAL_SERVER_ERROR, error.message, null)
        }
    },

    async getAllPost(req,res){
        try{
            const posts = await Post.find()

            return response(res, httpCodes.OK, 'Get all post success!',posts)
        }catch (error){
            logger.error(error.message)
            return response(res, httpCodes.INTERNAL_SERVER_ERROR, error.message, null)
        }
    },

    async getPostById(req,res){
        try{
            const posts = await Post.findById(req.params.id)
            return response(res, httpCodes.OK, 'Get post by id success!',posts)
        }catch (error){
            logger.error(error.message)
            return response(res, httpCodes.INTERNAL_SERVER_ERROR, error.message, null)
        }
    },
}