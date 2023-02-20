const commentsRouter = require("express").Router();

// router
// create comments
commentsRouter.post("/:idProduct", (req, res) => {})
// get all comments
commentsRouter.get("/all", (req, res) => { })
// update comment by id
commentsRouter.put("/comment/update/:id", (req, res) => { })

module.exports = commentsRouter;