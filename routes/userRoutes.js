const { Router } = require("express");
const userControler = require("../controllers/userController");

const router = Router();

router.get("/", userControler.getUsers);
router.post("/", userControler.addUser);
router.get("/:id", userControler.getUser);
router.patch("/:id", userControler.updateUser);
router.delete("/:id", userControler.deleteUser);

module.exports = router