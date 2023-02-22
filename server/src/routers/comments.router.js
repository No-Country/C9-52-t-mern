const commentsRouter = require("express").Router();

// middlewares
const { checkAuth } = require("../middlewares/auth");
const { protectComment } = require("../middlewares/protectionComment.middleware");

// controllers comments
const { 
  createComment,
  updateComment,
  allCommentsProduct,
  deleteComment
} = require('../controllers/comments.controller');

// router
// create comments
commentsRouter.post("/:idProduct", checkAuth, createComment)
// get all comments
commentsRouter.get("/all/product/:id", allCommentsProduct)
// update comment by id
commentsRouter.put("/comment/update/:id", checkAuth, protectComment, updateComment)
// delete comment by id
commentsRouter.delete("/comment/delete/:id", checkAuth, protectComment, deleteComment)

module.exports = commentsRouter;