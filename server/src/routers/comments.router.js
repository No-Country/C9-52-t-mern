const commentsRouter = require("express").Router();

// middlewares
const { checkAuth } = require("../middlewares/auth");

// controllers comments
const { 
  createComment,
  updateComment,
  allCommentsProduct
} = require('../controllers/comments.controller')

// router
// create comments
commentsRouter.post("/:idProduct", checkAuth, createComment)
// get all comments
commentsRouter.get("/all/product/:id", allCommentsProduct)
// update comment by id
commentsRouter.put("/comment/update/:id", updateComment)

module.exports = commentsRouter;