const { Router } = require("express");
const postControler = require("../controllers/postController");

const router = Router();

router.get("/", postControler.getPosts);
router.post("/", postControler.addPost);
router.get("/:id", postControler.getPost);
router.patch("/:id", postControler.updatePost);
router.delete("/:id", postControler.deletePost);

module.exports = router