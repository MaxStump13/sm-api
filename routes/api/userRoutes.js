const router = require("express").Router();
const {
	getUsers,
	getSingleUser,
	createUser,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser);

// need update/delete
// add friends post/delete route at/friends/:friendID

module.exports = router;
